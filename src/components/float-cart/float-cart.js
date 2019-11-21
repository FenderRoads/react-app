import React, { Component } from 'react';

import FloatCartItem from '../float-cart-item';
import './float-cart.css';

export default class FloatCart extends Component {
  render() {
    const { basketCount, onClickPlus, onClickMinus, basketData, onClickDeleteItem, onSubtotal, floatCartOpen, onCartOpen } = this.props;
    const elements = basketData.map((item) => {
      const {id, ...itemCartProps} = item;

      return (
        <FloatCartItem {...itemCartProps}
        key={id}
        onClickDeleteItem={() => onClickDeleteItem(id)}
        onClickPlus={() => onClickPlus(id)} 
        onClickMinus={() => onClickMinus(id)}
        />
      )
    })

    let classFloatCart = 'float-cart'

    if (floatCartOpen) {
      classFloatCart += ' float-cart--open'
    }

    return (
      <div className={classFloatCart}>
        <div className="float-cart-close" onClick={onCartOpen}><i className="fas fa-times"></i></div>
        <div className="float-cart-wrapper">
          <div className="cart-header">
            <div className="title">Cart</div>
            <i className="fas fa-shopping-cart"></i>
            <div className="sum">{basketCount}</div>
          </div>
          <div className="cart-body">
            {elements}
          </div>
          <div className="cart-footer">
            <div className="cart-subtotal">
              <div className="subtotal">КОНЕЧНАЯ ЦЕНА:</div>
              <div className="price">{onSubtotal} $</div>
            </div>
            <button className="btn btn-primary w-100">КУПИТЬ</button>
          </div>
        </div>
      </div>
    )
  }
}