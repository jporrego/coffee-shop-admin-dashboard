import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Brand } from "../../../types";
import "./BrandCreate.css";

type Inputs = {
  name: string;
};

const BrandCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + `brand/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 200) {
        throw new Error("Already exists");
      } else {
        navigate("/brands");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-create">
      <div className="form-title">Add New Brand</div>
      <form onSubmit={handleSubmit(onSubmit)} className="category-create-form">
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Brand Name</label>
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default BrandCreate;
