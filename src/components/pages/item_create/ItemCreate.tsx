import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { ProductPOST, Category, Brand } from "../../../types";
import "./ItemCreate.css";

type Inputs = {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  picture: any;
};

const ItemCreate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const getCategoriesAndBrands = async () => {
    try {
      const response = await Promise.all([
        fetch(process.env.REACT_APP_API_URL + "categories"),
        fetch(process.env.REACT_APP_API_URL + "brands"),
      ]);
      const categoryData = await response[0].json();
      const brandData = await response[1].json();
      setCategories(categoryData);
      setBrands(brandData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // First we fetch the category and brand by id (data.category).
      // Then we add them object to the newItem object.
      setLoading(true);
      const response = await Promise.all([
        fetch(process.env.REACT_APP_API_URL + `category/${data.category}`),
        fetch(process.env.REACT_APP_API_URL + `brand/${data.brand}`),
      ]);

      const categoryData: Category = await response[0].json();
      const brandData: Brand = await response[1].json();
      const newItem: ProductPOST = {
        ...data,
        category: categoryData,
        brand: brandData,
        picture: data.picture[0],
      };

      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("brand", newItem.brand._id);
      formData.append("category", newItem.category._id);
      formData.append("description", newItem.description);
      formData.append("price", newItem.price.toString());
      formData.append("stock", newItem.stock.toString());
      formData.append("picture", data.picture[0]);

      const res = await fetch(process.env.REACT_APP_API_URL + "item/create", {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      const resData = await res.json();
      if (res.status !== 201) {
        resData.message && showErrorMessage(resData.message);
        return;
      } else {
        navigate(`/item/${resData._id}`);
      }
    } catch (error) {
      setLoading(false);
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      showErrorMessage(message);
    }
  };

  const loadingElement = (
    <div className="loading">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const formElement = (
    <React.Fragment>
      <div className="form-title">Add New Item</div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className="item-create-form">
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Item Name</label>
        <input
          {...register("name", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9\s]*$/,
              message: "Please only use alphanumeric characters",
            },
          })}
          minLength={1}
          maxLength={30}
        />
        {errors.name?.type === "required" && <span>Name is required.</span>}
        {errors.name?.message && <span>{errors.name?.message}</span>}

        <label htmlFor="brand">Brand</label>
        <select {...register("brand", { required: true })}>
          {brands.map((brand) => (
            <option value={brand._id} key={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brand && <span>Brand is required</span>}

        <label>Category</label>
        <select {...register("category", { required: true })}>
          {categories.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <span>Category is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <label>Description</label>
        <textarea
          {...register("description", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9\s,.!-]*$/,
              message: "Please only use alphanumeric characters",
            },
          })}
          maxLength={230}
        />
        {errors.description?.type === "required" && (
          <span>Description is required.</span>
        )}
        {errors.description?.message && (
          <span>{errors.description?.message}</span>
        )}

        <label>Price</label>
        <input
          {...register("price", { required: true, min: 0 })}
          type="number"
          min={1}
          max={999}
        />
        {errors.description && <span>Price is required</span>}

        <label>Stock</label>
        <input
          {...register("stock", { required: true, min: 0 })}
          type="number"
          min={1}
          max={999}
        />
        {errors.description && <span>Stock is required</span>}

        <label>Picture</label>
        <input
          {...register("picture", { required: true })}
          type="file"
          accept="image/*"
        />
        {errorMessage && (
          <div className="item-create-error">{errorMessage}</div>
        )}
        {errors.description && <span>Picture is required</span>}

        <input type="submit" />
      </form>
    </React.Fragment>
  );

  return (
    <div className="item-create">{loading ? loadingElement : formElement}</div>
  );
};

export default ItemCreate;
