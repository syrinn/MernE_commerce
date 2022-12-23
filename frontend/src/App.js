import { lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Produits from "./screens/Produits";
import WishList from "./screens/WishList";
import AddProduit from "./screens/AddProduit";
import AddCategorie from "./screens/AddCategorie";
import CategoriesList from "./screens/CategoriesList";
import Error404Page from "./screens/Error404Page";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoriesList />} />
        <Route path='/categories/:categoryId' element={<Produits />} />
        <Route path='/wishList' element={<WishList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/addproduit' element={<AddProduit />} />
        <Route path='/addcategorie' element={<AddCategorie />} />
        <Route path='*' element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
