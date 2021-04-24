import React from "react";
import "./Products.css";
import ProductListItem from "./ProductListItem.js";

const ProductList = ({ products, addProduct }) => {

    const items = products.map(item => {
        return <ProductListItem key={item.id} item={item} addProduct={addProduct}/>
    }) 
  return (
    <section>
      <h1>My Garage Sale</h1>
      <ul className="Products">{items}</ul>
    </section>
  );
};

export default ProductList;
