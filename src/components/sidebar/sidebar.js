import React, { Component } from 'react';

import './sidebar.css';

export default class Sidebar extends Component {

  maxId = 100;

  button = (name, label) => {
    return {
      name,
      label,
      id: this.maxId++
    }
  }

  categoryButtons = [
    this.button('all', 'Вся продукция'),
    this.button('phone', 'Смартфоны'),
    this.button('laptop', 'Ноутбуки'),
    this.button('headphone', 'Наушники')
  ]

  sortingButtons = [
    this.button('no', 'Без сортировки'),
    this.button('decrease', 'По убыванию цены'),
    this.button('increase', 'По возрастанию цены')
  ]

  render() {
    const { sorting, filter, onFilterChange, onSortingChange } = this.props;
    

    const sortingBtns = this.sortingButtons.map(({ name, label, id }) => {
      const isActive = sorting === name;
      const clazz = isActive ? 'sorting-active' : '';

      return (
        <li key={id}>
          <span 
          className={clazz}
          onClick={() => onSortingChange(name)}> 
          {label}
          </span>
        </li>
      )
    });

    const categoryBtns = this.categoryButtons.map(({ name, label, id }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'category-active' : '';

      return (
        <li key={id}>
          <span 
          className={clazz}
          onClick={() => onFilterChange(name)}>
          {label}</span>
        </li>
      )
    });

    return (
      <div className="sidebar">
        <div className="category">
          <div className="category-title">Категория</div>
          <ul>
            {categoryBtns}
          </ul>
        </div>
        <div className="sorting">
          <div className="sorting-title">Сортировать</div>
          <ul>
            {sortingBtns}
          </ul>
        </div>
      </div>
    )
  }
}