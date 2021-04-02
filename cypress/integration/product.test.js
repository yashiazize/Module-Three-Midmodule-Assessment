import productData from "../../src/data/productData";
import formatPrice from "../../src/helpers/formatPrice";

describe("product", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("displays the name, photo, and description", () => {
    productData.forEach((product) => {
      const { name, description, img } = product;
      cy.findByText(name).should("exist");
      cy.findByText(description).should("exist");
      cy.get(`img[src="${img}"]`).should("exist");
    });
  });

  it("displays a price formatted in dollars and cents", () => {
    productData.forEach((product) => {
      const { price } = product;
      cy.findByText(`Price: ${formatPrice(price)}`).should("exist");
    });
  });

  it("has an Add To Cart button", () => {
    cy.findAllByText("Add To Cart").should("have.length", productData.length);
  });
});
