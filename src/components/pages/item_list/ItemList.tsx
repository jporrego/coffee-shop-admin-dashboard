import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";
import { Product as ProductInferface } from "../../../types";
import Product from "../../product/Product";

function ItemList() {
  const [products, setProducts] = useState<ProductInferface[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
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
