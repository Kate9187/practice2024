import React, { Component } from 'react';
import CategoryDataService from '../services/category.service';
import { Link } from 'react-router-dom';

export default class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.state = {
      categories: []
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

  render() {
    const { categories } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Categories List</h4>
          <ul className="list-group">
            {categories &&
              categories.map((category, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {category.name}
                  <Link to={'/categories/' + category.id} className="btn btn-warning btn-sm">
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
