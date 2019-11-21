import React, { Component } from 'react';

import Card from '../card';

import './catalog.css';

export default class Catalog extends Component {


  render() {
    const { cards, onClickBasket } = this.props;

    const elements = cards.map((item) => {
      const { id, ...itemProps } = item;
  
      return (
        <Card { ...itemProps } 
        key={id} 
        onBasket={ () => onClickBasket(id) } 
        />
      )
    })


    
    return (
      <div className="catalog">
        {elements}
      </div>
    )
  
  }
}