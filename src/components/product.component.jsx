import React, { Component } from 'react';
import ProductDataService from '../services/product.service';
import { withRouter } from '../common/with-router';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: '',
        price: 0
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        name: name
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
  }

  getProduct(id) {
    ProductDataService.getById(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProduct() {
    ProductDataService.update(this.state.currentProduct.id, this.state.currentProduct)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: 'The product was updated successfully!'
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProduct() {
    ProductDataService.delete(this.state.currentProduct.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate('/products');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
              </div>
            </form>

            <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteProduct}>
              Delete
            </button>

            <button type="submit" className="btn btn-success" onClick={this.updateProduct}>
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);
