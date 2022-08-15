import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.scss";
import Home from "./containers/home/index";
import SignIn from "./containers/login/index";
import Register from "./containers/register";
import Product from "./containers/product";
import Exchange1 from "./containers/productDescription";
import Profile from "./containers/profile";
import Inventory from "./containers/inventory";
import AddItem from "./containers/addItem";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/exchange" element={<Exchange1 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addItem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
