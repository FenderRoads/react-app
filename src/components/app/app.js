import React, { Component } from 'react';

import Header from '../header'
import Sidebar from '../sidebar';
import Catalog from '../catalog';
import Clock from '../clock';
import FloatCart from '../float-cart';

import './app.css';


export default class App extends Component {

  maxId = 1000;

  state = {
    basketData: [],
    cardData: [
      this.card('Xiaomi Redmi 5 Plus', 249, 'phone'),
      this.card('Xiaomi Redmi 4', 149, 'phone'),
      this.card('Xiaomi Redmi 3', 99, 'phone'),
      this.card('Xiaomi Redmi 6', 399, 'phone'),
      this.card('Xiaomi Mi Notebook Air', 899, 'laptop'),
      this.card('Xiaomi Mi True Wireless Earbuds', 349, 'headphone'),
      this.card('Ноутбук Xiaomi Mi Notebook Pro', 1199, 'laptop'),
      this.card('Xiaomi Redmi AirDots', 199, 'headphone'),
      this.card('Xiaomi AirDots Pro 2', 2, 'headphone'),
    ],
    filter: 'all',
    time: new Date(),
    term: '',
    sorting: 'decrease',
    floatCartOpen: false
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => {this.tick()},
      1000
    )
  }

  card(name, price, type) {
    return {
      name,
      price,
      type,
      inBasket: false,
      quanity: 1,
      id: this.maxId++
    }
  }

  propertyNotToggle(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: true};

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  property(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onCartOpen = () => {
    this.setState({
      floatCartOpen: !this.state.floatCartOpen
    });
  }

  onClickBasket = (id) => {
    this.setState(({ cardData, basketData }) => {
      const idx = cardData.findIndex((el) => el.id === id);

      const item = cardData[idx];
      return {
        cardData: this.propertyNotToggle(cardData, id, 'inBasket'),
        basketData: [...basketData.slice(0, idx), item, ...basketData.slice(idx)]
      }
    });
  }
  
  onClickDeleteItem = (id) => {
    this.setState(({ cardData, basketData }) => {
      const idx = basketData.findIndex((el) => el.id === id);

      const newArray = [
        ...basketData.slice(0, idx), 
        ...basketData.slice(idx + 1)
      ]
      return {
        cardData: this.property(cardData, id, 'inBasket'),
        basketData: newArray
      }
    });
  }

  onClickPlus = (id) => {
    this.setState(({ basketData }) => {
      const idx = basketData.findIndex((el) => el.id === id);

      const oldItem = basketData[idx];
      const newItem = {...oldItem, quanity: oldItem.quanity + 1, price: oldItem.price * oldItem.quanity};

      return {
        basketData: [...basketData.slice(0, idx), newItem, ...basketData.slice(idx + 1)]
      }
    });
  }

  onClickMinus= (id) => {
    this.setState(({ basketData }) => {
      const idx = basketData.findIndex((el) => el.id === id);

      const oldItem = basketData[idx];
      if (oldItem.quanity === 1) {
        return 1;
      }
      const newItem = {...oldItem, quanity: oldItem.quanity - 1, price: oldItem.price * oldItem.quanity};

      return {
        basketData: [...basketData.slice(0, idx), newItem, ...basketData.slice(idx + 1)]
      }
    });
  }

  onSubtotal = (basketData) => {
    let result = basketData.reduce((sum, current) => {
      return sum + current.price;
    }, 0)
    return result
  }

  tick() {
    this.setState({ time: new Date() });
  }

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onSortingChange = (sorting) => {
    this.setState({ sorting })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'phone':
        return items.filter((el) => el.type === 'phone');
      case 'laptop':
        return items.filter((el) => el.type === 'laptop');
      case 'headphone':
        return items.filter((el) => el.type === 'headphone');
      default:
        return items;
    }
  }

  sorting(items, sorting) {
    switch(sorting) {
      case 'no':
        return items.sort((a, b) => { return Math.random() - 0.5 });
      case 'decrease':
        return items.sort((a, b) => { return a.price - b.price });
      case 'increase':
        return items.sort((a, b) => { return b.price - a.price });
      default:
        return items;
    }
  }

  render() {
    const { cardData, time, filter, term, sorting, basketData, floatCartOpen } = this.state;

    const visibleItems = this.filter(this.search(cardData, term), filter)
    const visibleItemsSort = this.sorting(visibleItems, sorting)
    const basketCount = cardData.filter((el) => el.inBasket).length;
    return (
      <div className="app">
        <Clock 
        timeProp={ time.toLocaleTimeString() }
        />
        <FloatCart 
        basketCount={basketCount} 
        basketData={basketData}
        onClickDeleteItem={this.onClickDeleteItem}
        onClickPlus={this.onClickPlus}
        onClickMinus={this.onClickMinus}
        onSubtotal={this.onSubtotal(basketData)}
        floatCartOpen={floatCartOpen}
        onCartOpen={this.onCartOpen}
        />
        <Header 
        basketCount={basketCount} 
        onSearchChange={ this.onSearchChange }
        onCartOpen={this.onCartOpen}
        />
        <div className="main d-flex container">
          <Sidebar 
          filter={filter}
          sorting={sorting} 
          onFilterChange={this.onFilterChange}
          onSortingChange={this.onSortingChange}
          />
          <Catalog 
          cards={ visibleItemsSort }
          onClickBasket={ this.onClickBasket } 
          onClickCart={this.onClickCart}
          />
        </div>
      </div>
    )
  }
} 