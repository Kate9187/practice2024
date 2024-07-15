import React, { Component } from 'react';
import ProductService from '../services/product.service';
import CategoryDataService from '../services/category.service';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);

    this.state = {
      id: null,
      name: '',
      price: '',
      categoryId: '',
      categories: [],
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveCategories();
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

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      categoryId: e.target.value
    });
  }

  saveProduct() {
    var data = {
      name: this.state.name,
      price: this.state.price,
      categoryId: this.state.categoryId
    };

    ProductService.create(data.categoryId, data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          categoryId: response.data.categoryId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: '',
      price: '',
      categoryId: '',
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {' '}
        {this.state.submitted ? (
          <div>
            <h4> You successfully added new product! </h4>{' '}
            <button className="btn btn-success" onClick={this.newProduct}>
              Добавить{' '}
            </button>{' '}
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name"> Name </label>{' '}
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>{' '}
            <div className="form-group">
              <label htmlFor="price"> Price </label>{' '}
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>{' '}
            <div className="form-group">
              <label htmlFor="category"> Category </label>{' '}
              <select
                className="form-control"
                id="category"
                required
                value={this.state.categoryId}
                onChange={this.onChangeCategory}
                name="category"
              >
                <option value=""> Choose category </option>{' '}
                {this.state.categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {' '}
                    {category.name}{' '}
                  </option>
                ))}{' '}
              </select>{' '}
            </div>{' '}
            <button onClick={this.saveProduct} className="btn btn-success">
              Submit{' '}
            </button>{' '}
          </div>
        )}{' '}
      </div>
    );
  }
}
