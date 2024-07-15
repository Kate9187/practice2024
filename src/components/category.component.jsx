import React, { Component } from 'react';
import CategoryDataService from '../services/category.service';
import ProductService from '../services/product.service';
import { withRouter } from '../common/with-router';
import { Link } from 'react-router-dom';

class Category extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.deleteAllProducts = this.deleteAllProducts.bind(this);

    this.state = {
      currentCategory: {
        id: null,
        name: ''
      },
      products: [],
      message: ''
    };
  }

  componentDidMount() {
    this.getCategory(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        name: name
      }
    }));
  }

  getCategory(id) {
    CategoryDataService.get(id)
      .then((response) => {
        this.setState({
          currentCategory: response.data
        });
        this.retrieveProducts(response.data.id);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCategory() {
    CategoryDataService.update(this.state.currentCategory.id, this.state.currentCategory)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: 'The category was updated successfully!'
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCategory() {
    CategoryDataService.delete(this.state.currentCategory.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate('/categories');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveProducts(categoryId) {
    ProductService.getByCategory(categoryId)
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

  deleteAllProducts() {
    const { currentCategory } = this.state;
    ProductService.deleteByCategory(currentCategory.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: []
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCategory, products } = this.state;

    return (
      <div>
        {currentCategory ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCategory.name}
                  onChange={this.onChangeName}
                />
              </div>
            </form>

            <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteCategory}>
              Delete
            </button>

            <button type="submit" className="btn btn-success" onClick={this.updateCategory}>
              Update
            </button>
            <p>{this.state.message}</p>

            <h4>Products</h4>
            <ul className="list-group">
              {products.map((product, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {product.name} - ${product.price}
                  <Link to={'/products/' + product.id} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
            <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteAllProducts}>
              Delete All Products
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Category...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Category);
