import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import "./ItemEdit.css";
import {
  Product as ProductInteface,
  ProductPOST,
  Brand,
  Category,
} from "../../../types";
import CloudinaryImg from "../../cloudinary_img/CloudinaryImg";

type Inputs = {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  picture: any;
};

const ItemEdit = () => {
  const [item, setItem] = useState<ProductInteface>({
    _id: "",
    name: "",
    category: {
      _id: "",
      name: "",
    },
    brand: {
      _id: "",
      name: "",
    },
    description: "",
    price: 0,
    stock: 0,
    img: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPicture, setNewPicture] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getItemToEdit();
    getCategoriesAndBrands();
  }, []);

  useEffect(() => {
    setInitialValues();
  }, [item]);

  const params = useParams();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const getCategoriesAndBrands = async () => {
    try {
      const response = await Promise.all([
        fetch("http://localhost:4000/categories"),
        fetch("http://localhost:4000/brands"),
      ]);
      const categoryData = await response[0].json();
      const brandData = await response[1].json();
      setCategories(categoryData);
      setBrands(brandData);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemToEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/item/${params.id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setInitialValues = () => {
    // After the item state is updated, it sets the initial values to edit.
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("category", item.category._id);
    setValue("brand", item.brand._id);
    setValue("price", item.price);
    setValue("stock", item.stock);
    //setValue("picture", item.img);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // First we fetch the category and brand by id (data.category).
      // Then we add them object to the newItem object.
      setLoading(true);
      const response = await Promise.all([
        fetch(`http://localhost:4000/category/${data.category}`),
        fetch(`http://localhost:4000/brand/${data.brand}`),
      ]);
      const categoryData: Category = await response[0].json();
      const brandData: Brand = await response[1].json();
      let newItem: ProductPOST = {
        ...data,
        category: categoryData,
        brand: brandData,
      };

      // Two ways of dealing with the picture.
      // If there's a new one, upload the file. Otherwise just keep the path string.
      if (newPicture) {
        const formData = new FormData();
        formData.append("name", newItem.name);
        formData.append("brand", newItem.brand._id);
        formData.append("category", newItem.category._id);
        formData.append("description", newItem.description);
        formData.append("price", newItem.price.toString());
        formData.append("stock", newItem.stock.toString());
        formData.append("picture", data.picture[0]);
        const res = await fetch(
          `http://localhost:4000/item/${params.id}/update-new-image`,
          {
            method: "POST",
            body: formData,
          }
        );

        setLoading(false);
        console.log(res.status);
        if (res.status !== 200) {
          const resData = await res.json();
          resData.message && showErrorMessage(resData.message);
          return;
        } else {
          navigate(`/item/${params.id}`);
        }
      } else {
        newItem = { ...newItem, picture: item.img };
        await fetch(`http://localhost:4000/item/${params.id}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        setLoading(false);
        navigate(`/item/${params.id}`);
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
      <div className="form-title">Edit Item</div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className="item-create-form">
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Item Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}

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

        <label>Description</label>
        <textarea {...register("description", { required: true })} />
        {errors.description && <span>Name is required</span>}

        <label>Price</label>
        <input {...register("price", { required: true, min: 0 })} />
        {errors.description && <span>Price is required</span>}

        <label>Stock</label>
        <input {...register("stock", { required: true, min: 0 })} />
        {errors.description && <span>Stock is required</span>}

        <label>Picture</label>
        {!newPicture && (
          <CloudinaryImg path={item.img} size={80}></CloudinaryImg>
        )}
        <div>New Picture</div>
        <input
          {...register("picture", { required: false })}
          type="file"
          accept="image/*"
          onClick={() => setNewPicture(true)}
        />
        {errors.description && <span>Picture is required</span>}

        {errorMessage && (
          <div className="item-create-error">{errorMessage}</div>
        )}

        <input type="submit" />
      </form>
    </React.Fragment>
  );

  console.log();
  return (
    <div className="item-edit">{loading ? loadingElement : formElement}</div>
  );
};

export default ItemEdit;
