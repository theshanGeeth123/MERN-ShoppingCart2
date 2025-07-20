import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CartPage from "./shoppingCart/CartPage";
import AddItemPage from "./shoppingCart/AddItemPage";
import EditItemPage from "./shoppingCart/EditItemPage";
import Nav from "./shoppingCart/Nav";
import Home from "./shoppingCart/Home";
import AllItemsPage from "./shoppingCart/admin/AllItemsPage";

// customer section

import CustomerEntry from "./customer/CustomerEntry";
import CustomerHome from "./customer/CustomerHome";
import CustomerLogin from "./customer/CustomerLogin";
import CustomerRegister from "./customer/CustomerRegister";

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<CustomerEntry />} />
        <Route path="/customer" element={<CustomerEntry />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/cart/new" element={<AddItemPage />} />
        <Route path="/cart/edit/:id" element={<EditItemPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminCart" element={<AllItemsPage />} />

        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/home" element={<CustomerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
