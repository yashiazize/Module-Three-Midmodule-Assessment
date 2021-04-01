import React from "react";
import formatPrice from "./helpers/formatPrice";
import Checkout from "./Checkout";
import "./Cart.css";

const totalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
};

const Cart = ({ items }) => {
  const subtotal = totalPrice(items);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <section className="Cart">
      <h1>Cart</h1>
      <ul>
        {items.map((item) => {
          const { id, name, price } = item;
          return (
            <li key={id}>
              {name}: {formatPrice(price)}
            </li>
          );
        })}
      </ul>
      <h2> Subtotal: {formatPrice(subtotal)}</h2>
      <h2> Tax: {formatPrice(tax)}</h2>
      <h2> Total: {formatPrice(total)}</h2>
      <Checkout total={total} />
    </section>
  );
};

export default Cart;
