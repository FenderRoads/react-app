import React, { Component } from 'react';

import './card.css';

export default class Card extends Component {



  render() {
    const { name, price, onBasket, inBasket } = this.props;

    const basketFalse = 'В корзину',
          basketTrue = 'В корзине' 
    let classNames = 'cardd-buy btn btn-outline-info';


    if (inBasket) {
      classNames += ' disabled'
    }

    return (
      <div className="cardd">
        <div className="cardd-img"><img src="https://sintetiki.net/images/product/9400/120/xiaomi-redmi-5-plus-1.png" alt=""/></div>
        <div className="cardd-title">{name}</div>
        <div className="cardd-footer">
          <div className="cardd-price">{price} $</div>
          <button 
          className={classNames}
          onClick={onBasket} disabled={inBasket ? true : false}>
          {inBasket ? basketTrue : basketFalse}
          </button>
        </div>
      </div>
    )
  }
}