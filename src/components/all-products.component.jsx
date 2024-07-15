import React, { Component } from 'react';
import CategoryDataService from '../services/category.service';
import ProductService from '../services/product.service';
import { Link } from 'react-router-dom';

export default class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.state = {
      categories: [],
      products: [],
      selectedCategory: null
    };
  }

  componentDidMount() {
    this.retrieveCategories();
    this.retrieveProducts();
  }

  retrieveCategories() {
    CategoryDataService.getAll()
      .then((response) => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveProducts(categoryId = null) {
    let retrieveFunction = categoryId ? ProductService.getByCategory(categoryId) : ProductService.getAll();

    retrieveFunction
      .then((response) => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeCategory(e) {
    const categoryId = e.target.value;
    this.setState({ selectedCategory: categoryId });
    this.retrieveProducts(categoryId);
  }

  render() {
    const { categories, products, selectedCategory } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <select className="form-control" value={selectedCategory || ''} onChange={this.onChangeCategory}>
              <option value="">Select Category</option>
              {categories &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <h4>Products List</h4>
          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {product.name}
                  <Link to={'/products/' + product.id} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
