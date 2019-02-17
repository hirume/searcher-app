// eslint-disable-next-line
import React, { Component } from 'react';
import "./Search.css";

function Search(props) {
    
    return (
      <div className="search">
        <form onSubmit={props.handleSubmit}>
          <input className="search-box"
            type="text"
            placeholder="Enter title..."
            value={props.searchTerm}
            onChange={props.handleChange}
          />
          <input type="submit" value="Search" className="button" />
        </form>
      </div>
    )
  };

  
  export default Search;
