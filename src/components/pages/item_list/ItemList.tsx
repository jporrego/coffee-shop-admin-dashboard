import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";
import { Product as ProductInferface } from "../../../types";
import Product from "../../product/Product";

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

          const response = await fetch("http://localhost:4000/");
          const data = await response.json();
          setProducts(data);

          setLoading(false);
          setErrorMsg("");
        } catch (error) {
          console.log(error);
          setLoading(false);
          if (tryToFetch) {
            setErrorMsg("Failed to connect to the server... trying again...");
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
    </div>
  );
}

export default ItemList;
