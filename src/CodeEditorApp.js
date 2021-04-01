/* eslint-disable no-eval */
import React from "react";

export default class CodeEditorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      output: "",
      error: "",
      history: [],
    };
  }

  handleSubmit = (e) => {
    console.log(`Submitted! ${e.target}`);
    e.preventDefault();
    const { code, history } = this.state;
    let output, error;
    try {
      output = eval(code);
    } catch (e) {
      error = e.message;
    } finally {
      const entry = { code, output, error };
      this.setState({
        error,
        output,
        history: [...history, entry],
      });
    }
  };

  handleCodeEditorChange = (e) => {
    this.setState({
      output: "",
      error: "",
    });
    const code = e.target.value;
    this.setState({ code });
  };

  clearCode = () => {
    this.setState({
      code: "",
      output: "",
      error: "",
    });
  };

  render() {
    const { code, output, error, history } = this.state;
    return (
      <>
        <h1>Cool Code Editor App</h1>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={code}
            onChange={this.handleCodeEditorChange}
            placeholder="write code here"
          />
          <button type="button" onClick={this.clearCode}>
            Clear Code
          </button>
          <button type="submit">Run Code!</button>
        </form>
        <h1>Output</h1>
        <p>{output}</p>
        <h1>Error</h1>
        <p>{error}</p>
        <h1>History</h1>
        <ul>
          {history.map((entry, i) => {
            return (
              <li key={`${i}${entry.code}`}>
                {" "}
                Code: {entry.code}, Output: {entry.output}, Error: {entry.error}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
