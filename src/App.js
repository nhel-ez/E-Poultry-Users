import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./components/Preview";
import About from "./components/AboutUs";
import PrevAbout from "./components/PrevAboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import Chicken from "./components/products/Chicken";
import Egg from "./components/products/Egg";
import CustomerInfo from "./components/forms/CustomerInfoForm";
import Profile from "./components/menus/Profile";
import AddTocart from "./components/menus/AddToCart";
import PreLoader from "./PreLoader";
import CheckoutForm from "./components/forms/CheckoutForm";
import CancelForm from "./components/forms/CancelForm";
import BuyAgainForm from "./components/forms/BuyAgainForm";
import ChangePassword from "./components/forms/ChangePassword";
import Checkout from "./components/menus/Checkout";
import Cancel from "./components/menus/Cancel";
import ToShip from "./components/menus/ToShip";
import Delivered from "./components/menus/Delivered";

function App() {
  return (
    <Router>
      <div className="app">
        <PreLoader />
        <Routes>
          <Route exact path="/" element={<Preview />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/prev-about" element={<PrevAbout />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/chicken" element={<Chicken />} />
          <Route exact path="/egg" element={<Egg />} />
          <Route exact path="/customer-info/:id" element={<CustomerInfo />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/add-to-cart" element={<AddTocart />} />
          <Route exact path="/checkout-form/:id" element={<CheckoutForm />} />
          <Route exact path="/cancel-form/:id" element={<CancelForm />} />
          <Route exact path="/buy-again-form/:id" element={<BuyAgainForm />} />
          <Route exact path="/change-password/" element={<ChangePassword />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/cancel" element={<Cancel />} />
          <Route exact path="/toship" element={<ToShip />} />
          <Route exact path="/delivered" element={<Delivered />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
