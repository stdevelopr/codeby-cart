import React, { useState } from "react";
import { insertDecimal } from "../../utils";
import "./ProductItem.scss";

function ProductItem({ product, addToCart, removeFromCart }) {
  const [counter, setCounter] = useState(0);
  return (
    <div className="item">
      <div className="image">
        <img src={product.imageUrl} alt="product" />
        <span className="priceLabel">x{counter}</span>
      </div>
      <div className="content">
        <div className="title">
          {product.name.charAt(0) + product.name.substring(1).toLowerCase()}
        </div>
        <div className="price">
          <span>R${insertDecimal(product.price)}</span>
        </div>
        <div className="sell-price">
          <span>R${insertDecimal(product.sellingPrice)}</span>
        </div>
        <div className="control">
          <button
            className="add"
            onClick={() => {
              addToCart(product);
              setCounter(counter + 1);
            }}
          >
            +
          </button>
          <button
            className="remove"
            onClick={() => {
              removeFromCart(product);
              if (counter > 0) setCounter(counter - 1);
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
