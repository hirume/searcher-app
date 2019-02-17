// eslint-disable-next-line
import React, { Component } from 'react';
import ListItem from './ListItem.js';
import FavHeart from './FavHeart.js'
import "./List.css";

function List(props) {
let resultsList = null
  
    if (props.viewList) {
      resultsList = (
        <ul className="list">
          {props.results.map(item => (
            <li className="list-item" key={item.imdbID}>
            <ListItem 
            movie={item}
             clickedItem={props.clickedItem}
              >
              <FavHeart favorites={props.favorites} movie={item} toggleFav={props.toggleFav}/>
              </ListItem>
            </li>
          ))}
        </ul>
      )
    }

return (
  <div>{resultsList}</div> 
)

}

export default List;