// eslint-disable-next-line
import React, { Component } from "react";
import ListItem from "./ListItem.js";
import "./List.css";

function List(props) {
  return (
    <div className="list-container">
      {props.movies.length > 0 ? (
        <div>
          <ul className="list">
            {props.movies.map(item => (
              <li className="list-item" key={item.imdbID}>
                <ListItem movie={item} id={item.imdbID} faves={props.faves} />
              </li>
            ))}
          </ul>
          {props.children}
        </div>
      ) : (
        <p>Nothing here yet</p>
      )}
    </div>
  );
}

export default List;
