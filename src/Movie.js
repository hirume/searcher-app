// eslint-disable-next-line
import React, { Component } from 'react';
import "./Movie.css"; 

function Movie(props) {
let text = Object.keys(props.favorites).includes(props.movie.imdbID) ? "Del" : "Add"
    return (
      <div className="movie-card">
              <div className="image-container"><img src={props.movie.Poster} alt="Poster" className="poster"></img></div>
        <div className="text-container">
        <h1>{props.movie.Title}</h1>
        <button className="button" onClick={() => props.toggleFav(props.movie.imdbID)}>{text}</button>
        <p className="info-section">{props.movie.Year}</p>
        <p>{props.movie.imdbRating}</p>
          <p className="info-section">{props.movie.Plot}</p>
        </div>
      </div>
    )
  }; 

  export default Movie;