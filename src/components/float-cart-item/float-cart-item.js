import React, { Component } from 'react';

import './float-cart-item.css';

export default class FloatCartItem extends Component {
  render() {
    const { name, price, type, quanity, onClickDeleteItem, onClickMinus, onClickPlus } = this.props;


    return (
      <div className="cart-item">
        <div className="cart-delete"
        onClick={ onClickDeleteItem }
        >
        <i className="fas fa-times"></i></div>
        <div className="cart-img"><img src="https://sintetiki.net/images/product/9400/120/xiaomi-redmi-5-plus-1.png" alt=""/></div>
        <div className="cart-details">
          <div className="cart-title">{name}</div>
          <div className="cart-type">Type: {type}</div>
          <div className="cart-quanity">Количество: {quanity}</div>
        </div>
        <div className="cart-price">
          <div className="price">{price} $</div>
          <div className="cur">
            <div className="plus" onClick={onClickPlus}>+</div>
            <div className="minus" onClick={onClickMinus}>-</div>
          </div>
        </div>
      </div>
    )
  }
}