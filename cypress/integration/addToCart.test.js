import productData from "../../src/data/productData";
import formatPrice from "../../src/helpers/formatPrice";

const BUTTON_TEXT = "Add To Cart";

const addItemToCart = () => {
  cy.findAllByText(BUTTON_TEXT).first().click();
};

const addItemsToCart = () => {
  cy.findAllByText(BUTTON_TEXT).each((button, i) => {
    if (i % 2 === 1) {
      button.click();
    }
  });
};

describe("add to cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("When I click on a product", () => {
    it("its name appears in the cart", () => {
      const { name } = productData[0];
      addItemToCart();

      cy.get("li").contains(name);
    });

    it("its formatted price appears in the cart", () => {
      const { price } = productData[0];
      addItemToCart();

      cy.get("li").contains(formatPrice(price));
    });

    it("the subtotal updates with the price of the item", () => {
      addItemToCart();

      cy.findByText("Subtotal: $19.99").should("exist");
    });

    it("the tax is 5% of the subtotal", () => {
      addItemToCart();

      cy.findByText("Tax: $1.00").should("exist");
    });

    it("the total is the subtotal plus tax", () => {
      addItemToCart();

      cy.findByText("Total: $20.99").should("exist");
    });
  });

  describe("When I click on additional products", () => {
    it("they are added to the cart", () => {
      addItemToCart();

      addItemsToCart();
      for (let i = 1; i < productData.length; i += 2) {
        const { name } = productData[i];
        cy.get("li").contains(name);
      }
    });

    it("the other items in the cart do not change", () => {
      const { name, price } = productData[0];
      addItemToCart();
      cy.get("li").contains(`${name}: ${formatPrice(price)}`);

      addItemsToCart();
      cy.get("li").contains(`${name}: ${formatPrice(price)}`);
    });

    it("the subtotal, tax, and total update as expected", () => {
      addItemToCart();
      cy.findByText("Subtotal: $19.99").should("exist");
      cy.findByText("Tax: $1.00").should("exist");
      cy.findByText("Total: $20.99").should("exist");

      addItemsToCart();
      cy.findByText("Subtotal: $89.98").should("exist");
      cy.findByText("Tax: $4.50").should("exist");
      cy.findByText("Total: $94.48").should("exist");
    });
  });
});
