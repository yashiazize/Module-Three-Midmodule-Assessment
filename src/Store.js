import React from "react";
import Cart from "./Cart";
import Products from "./Products";
import productData from "./data/productData";
import "./Store.css";

export default class Store extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  addToCart = (item) => {
    const { cart } = this.state;
    this.setState({
      cart: [...cart, item],
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div className="Store">
        <Products products={productData} addToCart={this.addToCart} />
        <Cart items={cart} />
      </div>
    );
  }
}
