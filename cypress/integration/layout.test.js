import productData from "../../src/data/productData";

describe("layout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has a section with products laid out in a grid", () => {
    cy.get(".Products").should("have.css", "display", "grid");
    cy.get(".Products").should("have.css", "grid-template-columns");

    productData.forEach((product) => {
      const { name } = product;
      cy.findByText(name).should("exist");
    });
  });

  it("has a cart section with subtotal, tax, and total", () => {
    cy.findByText("Cart").should("exist");
    cy.findByText(/Subtotal/).should("exist");
    cy.findByText(/Tax/).should("exist");
    cy.findByText(/Total/).should("exist");
  });

  it("has a checkout section with expected form inputs", () => {
    cy.findByText("Checkout").should("exist");
    cy.get("form").findByLabelText("First Name").should("exist");
    cy.get("form").findByLabelText("Last Name").should("exist");
    cy.get("form").findByLabelText("Email").should("exist");
    cy.get("form").findByLabelText("Credit Card").should("exist");
    cy.get("form").findByLabelText("Zip Code").should("exist");
    cy.get("button").contains("Buy Now").should("exist");
  });
});
