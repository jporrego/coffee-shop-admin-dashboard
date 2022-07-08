import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Brands from "./components/brands/Brands";
import BrandCreate from "./components/brands/brand_create/BrandCreate";
import Categories from "./components/categories/Categories";
import Inventory from "./components/inventory/Inventory";
import Navbar from "./components/navbar/Navbar";
import CategoryCreate from "./components/pages/category_create/CategoryCreate";
import ItemCreate from "./components/pages/item_create/ItemCreate";
import ItemDetail from "./components/pages/item_detail/ItemDetail";
import ItemEdit from "./components/pages/item_edit/ItemEdit";
import ItemList from "./components/pages/item_list/ItemList";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <div className="content">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/item/edit/:id" element={<ItemEdit />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/create/" element={<ItemCreate />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/create/" element={<CategoryCreate />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brand/create/" element={<BrandCreate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
