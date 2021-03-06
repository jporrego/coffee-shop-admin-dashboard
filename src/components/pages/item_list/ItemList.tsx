import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";
import { Product as ProductInferface } from "../../../types";
import Product from "../../product/Product";
import Spinner from "../../../assets/spinner.svg";

function ItemList() {
  const [products, setProducts] = useState<ProductInferface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let tryToFetch = true;
    setTimeout(() => {
      tryToFetch = false;
    }, 20000);

    while (tryToFetch) {
      if (process.env.REACT_APP_API_URL !== undefined) {
        try {
          setLoading(true);
          setErrorMsg(
            "Starting Heroku server. This can take around 10 seconds..."
          );

          const response = await fetch(process.env.REACT_APP_API_URL);
          const data = await response.json();
          setProducts(data);

          setLoading(false);
          setErrorMsg("");
          break;
        } catch (error) {
          console.log(error);
          setLoading(false);
          if (tryToFetch) {
            setErrorMsg(
              "Starting Heroku server. This can take around 10 seconds..."
            );
          } else {
            setErrorMsg("Failed to connect to the server.");
          }
        }
      } else {
        setErrorMsg("Failed to connect to the server.");
        break;
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      //Disabled for safety

      /*
      await fetch(`http://localhost:4000/item/${id}/delete`, {
        method: "DELETE",
      });
      */
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="item-list">
      {products.map((product) => (
        <Product
          key={product._id}
          product={product}
          handleDeleteProduct={handleDeleteProduct}
        ></Product>
      ))}
      {loading && (
        <div className="spinner">
          <img src={Spinner} alt="spinner" />
        </div>
      )}
      <div className="error-msg">{errorMsg}</div>
    </div>
  );
}

export default ItemList;
