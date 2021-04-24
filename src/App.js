import React from "react";
import "./App.css";
import ProductList from "./Components/ProductList";
import productData from "./data/productData";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import formatPrice from "./helpers/formatPrice"

class App extends React.Component {
  state = { cartList: []};

  addProduct = (item) => {
    this.setState((prevState) => {
      return { cartList: [...prevState.cartList, item] };
    });
  };

  
  total = () => {
    const { cartList } = this.state;
    let overallTotal = 0;
    cartList.forEach((item) => overallTotal += item.price)
    const total = overallTotal
    const tax = (overallTotal/100 * 5)
    return formatPrice(tax + total)
  }

  render() {
    const total = this.total()
    const { cartList } = this.state;
    let subtotal = 0;
    cartList.forEach((item) => (subtotal += item.price));
    const tax = formatPrice(subtotal/100 * 5)

    return (
      <main className="main">
        <ProductList products={productData} addProduct={this.addProduct} />
        <div className="checkout">
        <Cart cartList={cartList} subtotal={subtotal} total={total} tax={tax}/>
        <Checkout total={total}/>
        </div>
      </main>
    );
  }
}

export default App;
