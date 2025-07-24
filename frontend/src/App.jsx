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
import UserProfile from "./customer/UserProfile";


// Admin section

import AdminRegister from "./admin/AdminRegister.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import AddNewAdmin from "./admin/AddNewAdmin.jsx";
import ViewUsers from "./admin/ViewUsers.jsx";
import EditUser from "./admin/EditUser.jsx";  
import AddCardDetails from "./customer/cardDetails/AddCardDetails.jsx";
import ViewCardDetails from "./customer/cardDetails/ViewCardDetails.jsx";

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
        <Route path="/customer/profile" element={<UserProfile />} />


        {/* Admin routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
         <Route path="/admin/add" element={<AddNewAdmin />} />
         <Route path="/admin/view-users" element={<ViewUsers />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          <Route path="/customer/add-card" element={<AddCardDetails />} />
          <Route path="/customer/view-cards" element={<ViewCardDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
