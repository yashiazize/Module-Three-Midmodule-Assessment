const fetch = require("node-fetch");
const repoName = process.env["CIRCLE_PROJECT_REPONAME"];
const webhookUrl = process.env["SLACK_WEBHOOK_URL"];
const username =
  process.env["CIRCLE_PR_USERNAME"] ||
  process.env["CIRCLE_USERNAME"] ||
  "default user";

const prUrl = process.env["CIRCLE_PULL_REQUEST"];
const circleJobUrl = process.env["CIRCLE_BUILD_URL"];
const MAX_RESULTS_LOGGED = 5;

const notifyPass = async (numSuites) => {
  const msg = `🎉 ✅ Yay! *${username}* passed all ${numSuites} tests in ${repoName}!`;
  console.log(msg);
  await postToSlack(webhookUrl, msg);
};

const notifyFail = async ({ numSuites, passedSuites, failedSuites }) => {
  const numNotLogged =
    failedSuites.length > MAX_RESULTS_LOGGED
      ? failedSuites.length - MAX_RESULTS_LOGGED
      : 0;

  const moreResultsMsg = numNotLogged > 0 ? `...plus ${numNotLogged} more` : "";

  const msg = `😿 🚫 *${username}* passed ${
    passedSuites.length
  } / ${numSuites} tests in *${repoName}*
Failing tests:

• ${failedSuites.slice(0, MAX_RESULTS_LOGGED).join(" \n • ")}
${moreResultsMsg}
  `;
  console.log(msg);
  await postToSlack(webhookUrl, msg);
};

const slackButton = (text, url, style = "primary") => ({
  type: "button",
  text: {
    type: "plain_text",
    text,
    emoji: true,
  },
  value: text,
  url,
  style,
});

const slackButtons = () => {
  const buttons = [];
  if (prUrl) {
    buttons.push(slackButton("Visit GitHub PR", prUrl));
  }
  if (circleJobUrl) {
    buttons.push(slackButton("See Test Results", circleJobUrl));
  }
  return buttons;
};

const slackPostBody = (msg) => ({
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: msg,
      },
    },
    {
      type: "actions",
      elements: slackButtons(),
    },
    {
      type: "divider",
    },
  ],
});

const postToSlack = async (webhookUrl, msg) => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackPostBody(msg)),
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  notifyPass,
  notifyFail,
};
