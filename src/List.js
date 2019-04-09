// eslint-disable-next-line
import React, { Component } from 'react';
import ListItem from './ListItem.js';
import './List.css';


function List(props) {
if (props.movies.length > 0) {
  return (
    <div className='list-container'><ul className='list'>
      {props.movies.map(item => (
        <li className='list-item' key={item.imdbID}>
          <ListItem
            movie={item}
            id={item.imdbID}
            faves={props.faves}
          >
          </ListItem>
        </li>
      ))}
    </ul>
    {props.children}
    </div>
  )

}
else return <p>Nothing here yet</p>
}

export default List;