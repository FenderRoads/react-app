import React, { Component } from 'react';

import './header.css';

export default class Header extends Component {

  state = {
    term: ''
  }


  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }
  
  onCartOpen = () => {
    
  }

  render() {
    const { basketCount, onCartOpen } = this.props;



    return (
      <div className="header-outer">
        <div className="header d-flex container">
          <div className="title">
            <h2>Xiaomi Shop</h2>
          </div>
          <div className="search d-flex">
            <input type="text" className="form-control" 
            onChange={this.onSearchChange}
            value={this.state.term}/>
            <button type="button" className="btn btn-primary ml-1">Search</button>
          </div>
          <button 
          type="button" 
          className="cart btn btn-success"
          onClick={onCartOpen}>
            <i className="fas fa-shopping-cart"></i>
            <span className="sum">{basketCount}</span>
          </button>
        </div>
      </div>
    )
  }
}