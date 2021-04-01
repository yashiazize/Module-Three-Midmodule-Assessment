import React from "react";
import formatPrice from "./helpers/formatPrice";
import "./Products.css";

const mapProducts = (products, addToCart) => {
  return products.map((product) => {
    const { id, name, price, description, img } = product;
    return (
      <div className="Product" key={id}>
        <h2>{name}</h2>
        <p>Price: {formatPrice(price)}</p>
        <button
          onClick={() => {
            addToCart(product);
          }}
        >
          Add To Cart
        </button>
        <img src={img} alt={name} />
        <p>{description}</p>
      </div>
    );
  });
};

const Products = ({ products, addToCart }) => {
  return (
    <section>
      <h1>My Garage Sale</h1>
      <div className="Products">{mapProducts(products, addToCart)}</div>
    </section>
  );
};

export default Products;
