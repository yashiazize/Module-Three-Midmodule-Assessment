import React from "react";
import "./App.css";
import ProductList from "./Components/ProductList";
import productData from "./data/productData";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";

class App extends React.Component {
  state = { cartList: [], products: productData};

  addProduct = (item) => {
    this.setState((prevState) => {
      return { cartList: [...prevState.cartList, item] };
    });
  };

  subtotal = () => {
    const { cartList } = this.state;
    let subtotal = 0;
    cartList.forEach((item) => (subtotal += item.price));
    return subtotal.toFixed(2)
  }

  tax = () => {
    const { cartList } = this.state;
    let taxTotal = 0;
    cartList.forEach((item) => taxTotal += item.price)
    return (taxTotal/100 * 5).toFixed(2)
  }

  total = () => {
    const { cartList } = this.state;
    let overallTotal = 0;
    cartList.forEach((item) => overallTotal += item.price)
    const total = overallTotal.toFixed(2);
    const tax = (overallTotal/100 * 5).toFixed(2)
    return total + tax
  }

  render() {
    const {cartList} = this.state
    return (
      <div>
        <ProductList products={productData} addProduct={this.addProduct} />
        <Cart cartList={cartList} subtotal={this.subtotal} total={this.total} tax={this.tax}/>
        <Checkout />
      </div>
    );
  }
}

export default App;
