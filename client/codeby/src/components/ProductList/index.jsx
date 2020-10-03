import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import { insertDecimal } from "../../utils";
import "./ProductList.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("/products")
      .then(res => res.json())
      .then(response => setProducts(response));
  }, []);

  const calcTotalPrice = () => {
    let total = 0;
    cartProducts.map(item => {
      total += item.sellingPrice;
    });
    setTotalPrice(total);
  };

  const addToCart = product => {
    cartProducts.push(product);
    setCartProducts(cartProducts);
    calcTotalPrice();
  };

  const removeFromCart = product => {
    let removeIndex = cartProducts
      .map(item => {
        return item.uniqueId;
      })
      .indexOf(product.uniqueId);
    if (removeIndex >= 0) cartProducts.splice(removeIndex, 1);
    setCartProducts(cartProducts);
    calcTotalPrice();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Meu carrinho</h1>
      </div>
      <div className="products-cart">
        {products.map(product => {
          return (
            <ProductItem
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
        <div className="total">
          <h1>Total</h1>
          <h1>R${insertDecimal(totalPrice)}</h1>
        </div>
        <div className="finish">
          <button>Finalizar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
