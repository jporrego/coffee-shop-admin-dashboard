import React from "react";
import { Link } from "react-router-dom";
import ItemList from "../pages/item_list/ItemList";
import "./Inventory.css";

const Inventory = () => {
  return (
    <div className="inventory">
      <div className="inventory-title">Inventory</div>
      <div className="inventory-buttons">
        <Link to="/item/create">Add Item</Link>
        <Link to="/category/create">Add Category</Link>
        <Link to="/brand/create">Add Brand</Link>
      </div>
      <div className="inventory-content">
        <ItemList></ItemList>
      </div>
    </div>
  );
};

export default Inventory;
