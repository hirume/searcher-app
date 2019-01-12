import React, { Component } from 'react';
import "./App.css";
const axios = require('axios');

const Search = (props) => {
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <li className="list-item" key={item.imdbID} onClick={() => props.clicked(item)}>
                    <div className="image-container">
                        <img className="poster" src={item.Poster} alt="Movie Poster"/>
                        </div>
                        <div className="text-container">{item.Title}</div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="search">
            <input className="search-box" type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} />
            {resultList}
        </div>
    );
};
const Card = (props) => {
    return (
        <div className="container">
            <div className="movie-card">
            <div className="image-container">
                        <img src={props.movie.Poster} alt="Movie Poster"/>
                        </div>
                <div className="movie-content">
                    <div className="movie-content-header">
                        <h3 className="movie-title">{props.movie.Title}</h3>
                    </div>
                    <div className="movie-info">
                        <div className="info-section">
                            <label>Released</label>
                            <span>{props.movie.Released}</span>
                        </div>
                        <div className="info-section">
                            <label>IMDB Rating</label>
                            <span>{props.movie.imdbRating}</span>
                        </div>
                        <div className="info-section">
                            <label>Rated</label>
                            <span>{props.movie.Rated}</span>
                        </div>
                        <div className="info-section">
                            <label>Runtime</label>
                            <span>{props.movie.Runtime}</span>
                        </div>
                    </div>
                    <div className="plot">
                        <p>{props.movie.Plot}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
class App extends Component {
    state = {
        movieId: 'tt0110912',
        title: "",
        movie: {},
        searchResults: [],
        isSearching: false,
    }

    componentDidMount() {
        this.loadMovie()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieId !== this.state.movieId) {
            this.loadMovie()
        }
    }

    loadMovie() {
        axios.get(`http://www.omdbapi.com/?apikey=662e4552&i=${this.state.movieId}`)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch(error => {
                console.log('Oops!', error.message);
            })
    }

    
    searchMovie = (event) => {
        this.setState({ title: event.target.value, isSearching: true });

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            axios.get(`http://www.omdbapi.com/?apikey=662e4552&s=${this.state.title}`)
                .then(response => {

                    if (response.data.Search) {
                        const movies = response.data.Search.slice(0, 5);
                        this.setState({ searchResults: movies });
                    }
                })
                .catch(error => {
                    console.log('Oops!', error.message);
                })
        }, 1000)


    }

    itemClicked = (item) => {
        this.setState(
            {
                movieId: item.imdbID,
                isSearching: false,
                title: item.Title,
            }
        )
    }


    render() {
        return (
            <div onClick={() => this.setState({ isSearching: false })}>
                <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />

                <Card movie={this.state.movie} />
            </div>
        );
    }
}

export default App;
