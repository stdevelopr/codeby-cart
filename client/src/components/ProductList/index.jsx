import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import { insertDecimal } from "../../utils";
import ReactLoading from "react-loading";
import "./ProductList.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("/products")
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(response => {
        setProducts(response);
        setLoading(false);
      })
      .catch(error => console.log("Error", error));
  }, []);

  const calcTotalPrice = () => {
    let total = 0;
    cartProducts.forEach(item => {
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
      <div className="cart">
        <div className="header">
          <h1>Meu carrinho</h1>
        </div>
        <div className="products-cart">
          {loading && (
            <div className="loading">
              <ReactLoading
                type={"spin"}
                color={"blue"}
                height={100}
                width={100}
              />
            </div>
          )}
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
          {insertDecimal(totalPrice) > 10 && (
            <div className="free"> Parabéns, sua compra tem frete grátis !</div>
          )}
          <div className="finish">
            <button>Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
