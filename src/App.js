import React from "react";
import "./App.css";
import ProductList from "./Components/ProductList";
import productData from "./data/productData";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import formatPrice from "./helpers/formatPrice.js"

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
    return formatPrice(subtotal)
  }

  tax = () => {
    const { cartList } = this.state;
    let taxTotal = 0;
    cartList.forEach((item) => taxTotal += item.price)
    return formatPrice(taxTotal/100 * 5)
  }

  total = () => {
    const { cartList } = this.state;
    let overallTotal = 0;
    cartList.forEach((item) => overallTotal += item.price)
    const total = overallTotal
    const tax = (overallTotal/100 * 5)
    return formatPrice(tax + total)
  }

  render() {
    const {cartList} = this.state
    const subtotal = this.subtotal()
    const total = this.total()
    const tax = this.tax()
    return (
      <main className="main">
        <ProductList products={productData} addProduct={this.addProduct} />
        <Cart cartList={cartList} subtotal={subtotal} total={total} tax={tax}/>
        <Checkout total={total}/>
      </main>
    );
  }
}

export default App;
