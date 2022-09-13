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
import ExchangeRequest from "./containers/exchangeRequest";
import Exchanges from "./containers/exchanges";
import EditProfile from "./containers/editProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/exchange" element={<Exchange1 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/exchangeRequest" element={<ExchangeRequest />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
