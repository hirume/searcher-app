import React, { Component } from 'react';
function ListItem(props) {
    
        return (
            <div key={props.movie.imdbID} className="movie-item">
                <div className="list-movie-image"><img src={props.movie.Poster} alt="Poster" onClick={() => props.clickedItem(props.movie)}></img></div>
                    {props.children}
                <div className="list-movie-title">
                    {props.movie.Title}
                </div>
            </div>
        )
}

export default ListItem;