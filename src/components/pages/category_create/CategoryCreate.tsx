import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Category } from "../../../types";
import "./CategoryCreate.css";

type Inputs = {
  name: string;
};

const CategoryCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 200) {
        throw new Error("Already exists");
      } else {
        navigate("/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-create">
      <div className="form-title">Add New Category</div>
      <form onSubmit={handleSubmit(onSubmit)} className="category-create-form">
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Category Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default CategoryCreate;
