import React from "react"


const ProductListItem = ({item, addProduct}) => {
    const {name, price, img, description} = item
    return (
        <section>
            <h3>{name}</h3>
            <p>Price: ${price.toFixed(2)}</p>
            <button onClick={()=>addProduct(item)}>Add To Cart</button> 
            <img src={img} alt="Pic"/>
            <p>{description}</p>
        </section>
    )
}



export default ProductListItem;