import React from "react";
import "./Products.css";
import ProductListItem from "./ProductListItem.js";

const ProductList = ({ products, addProduct }) => {

    const items = products.map(item => {
        return <ProductListItem key={item.id} item={item} addProduct={addProduct}/>
    }) 
  return (
    <section className="Products">
      <h1>My Garage Sale</h1>
      <ul>{items}</ul>
    </section>
  );
};

export default ProductList;