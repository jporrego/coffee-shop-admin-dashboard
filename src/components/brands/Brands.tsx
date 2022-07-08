import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { Brand } from "../../types";
import "./Brands.css";

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getBrands();
  }, []);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000);
  };

  const getBrands = async () => {
    try {
      const response = await fetch("http://localhost:4000/brands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/brand/${id}/delete`, {
        method: "POST",
      });

      if (res.status !== 200) {
        const data = await res.json();
        data.message && showErrorMessage(data.message);
      }

      getBrands();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="brands">
      <div className="brands-title">Brands</div>
      <div className="brands-buttons">
        <Link to="/brand/create">Add Brand</Link>
      </div>
      <div className="brands-content">
        {brands.map((brand) => (
          <div className="brand hover-translate-y" key={brand._id}>
            {brand.name}
            <AiFillDelete
              onClick={() => handleDeleteBrand(brand._id)}
            ></AiFillDelete>
          </div>
        ))}
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default Brands;
