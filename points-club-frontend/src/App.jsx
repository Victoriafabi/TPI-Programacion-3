import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


import LayoutWithoutNavbar from "./components/common/layout/layoutWithoutNavbar/LayoutWithoutNavbar"
import LayoutWithNavbar from "./components/common/layout/layoutWithNavbar/LayoutWithNavbar";
import ProtectedPage from "./components/protectedPage/ProtectedPage";

import Home from "../src/components/pages/home/Home"
import NotFound from "./components/pages/notFound/NotFound"
import Login from "./components/pages/login/Login"
import Register from './components/pages/register/Register'
import Products from './components/pages/products/Products';
import MyBranches from './components/pages/branches/Branches';
import UserPoints from './components/pages/userPoints/UserPoints';


import AddProduct from './components/pages/adminProduct/addProduct/AddProduct';
import DeleteProduct from './components/pages/adminProduct/deleteProduct/DeleteProduct';
import ModifyProduct from './components/pages/adminProduct/modifyProduct/ModifyProduct';
import AdminProducts from './components/pages/adminProduct/AdminPoducts';


import AddUser from './components/pages/adminUsuarios/addUser/AddUser';
import ModifyUser from './components/pages/adminUsuarios/modifyUser/ModifyUser';
import DeleteUser from './components/pages/adminUsuarios/deleteUser/DeleteUser';
import AdminUsuarios from  './components/pages/adminUsuarios/AdminUsuarios';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWithoutNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={
            <ProtectedPage>
              <LayoutWithNavbar />
            </ProtectedPage>
          }>
            <Route path="/Products" element={<Products />} />
            <Route path="/UserPoints" element={<UserPoints />} />
            <Route path="/Branches" element={<MyBranches />} />

            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/DeleteProduct" element={<DeleteProduct />} />
            <Route path="/AdminProducts" element={<AdminProducts />} />
            <Route path="/ModifyProduct/:id" element={<ModifyProduct />} />

            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/ModifyUser/:id" element={<ModifyUser />} />
            <Route path="/DeleteUser" element={<DeleteUser />} />
            <Route path="/AdminUsuarios" element={<AdminUsuarios />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
         <ToastContainer 
        position="top-right" 
        autoClose={3000} 
      />
      </BrowserRouter>

     
    </>
  );
}


export default App;