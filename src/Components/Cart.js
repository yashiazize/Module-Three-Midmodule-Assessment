import React from "react";

const Cart = ({ cartList, subtotal, total, tax }) => {
    
  return (
    <section>
      <h1>Cart</h1>
      <ul>
        {cartList.map((item) => {
          const { name, price, id } = item;
          return (
            <li key={id}>
                {name}: ${price.toFixed(2)}
            </li>
          );
        })}
      </ul>
      <h3>Subtotal: {subtotal}</h3>
      <h3>
          Tax: {tax}</h3>
      <h3>Total: {total}</h3>
    </section>
  );
};

export default Cart;
