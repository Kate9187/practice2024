import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddCategory from './components/add-category.component';
import Category from './components/category.component';
import CategoriesList from './components/categories-list.component';
import AddProduct from './components/add-product.component';
import AllCategories from './components/all-categories.component';
import AllProducts from './components/all-products.component';
import Product from './components/product.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            Kate9187
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                AddCategory
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addProduct" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/allProducts" className="nav-link">
                Products
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CategoriesList />} />
            <Route path="/tutorials" element={<CategoriesList />} />
            <Route path="/add" element={<AddCategory />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/allProducts" element={<AllProducts />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
