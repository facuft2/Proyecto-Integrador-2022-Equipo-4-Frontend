import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./containers/home/index";
import SignIn from "./containers/login/index";
import Register from "./containers/register";
import Product from "./containers/product";
import Exchange1 from "./containers/productDescription";
import Profile from "./containers/profile";
import Inventory from "./containers/inventory";
import AddItem from "./containers/addItem";
import ExchangeRequest from "./containers/exchangeRequest";
import VisualizeExchange from "./containers/visualizeExchange";
import Exchanges from "./containers/exchanges";
import EditProfile from "./containers/editProfile";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/exchange/:id" element={<Exchange1 />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/exchangeRequest/:id" element={<ExchangeRequest />} />
        <Route path="/visualizeExchange" element={<VisualizeExchange />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
