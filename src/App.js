// eslint-disable-next-line
import React, { Component } from 'react';
import Search from './Search.js';
import Movie from './Movie.js';
import List from './List.js';
import Button from './Button.js';
import "./App.css";

const axios = require('axios');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieId: "tt0110912",
      searchResults: [],
      searchTerm: "",
      viewList: false,
      favorites: {},
      viewFaves: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
    this.showFaves = this.showFaves.bind(this);

  }

  componentDidMount() {
    let favsStored = {};
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        favsStored[`${localStorage.key(i)}`] = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`))
      }
      this.setState({ favorites: favsStored })
    };

    this.loadMovie();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieId !== this.state.movieId) {
      this.loadMovie()
    }
  }


  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ viewList: true });
    if (this.state.searchTerm !== "") {
      await axios.get(`http://www.omdbapi.com/?apikey=662e4552&s=${this.state.searchTerm}`)
        .then(response => {
          if (response.data.Search) {
            const movies = response.data.Search.slice(0, 10);
            this.setState({ searchResults: movies });
          }
        })
        .catch(error => {
          console.log('Oops!', error.message);
        })
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

  itemClicked = (item) => {
    this.setState(
      {
        movieId: item.imdbID,
        viewList: false,
      }
    )
  }

  toggleFav(item, mv = this.state.movie) {
    let favs = this.state.favorites;
    if (Object.keys(favs).includes(item)) {
      delete favs[`${item}`];
      localStorage.removeItem(`${item}`);
      this.setState({ favorites: favs });
      console.log(`Deleted ${item}`)
    }
    else favs[`${item}`] = mv;
    this.setState({ favorites: favs });
    localStorage.setItem(`${item}`, JSON.stringify(mv));
    console.log(`Added ${item}`);
  }

  isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
      else return true;
    }
  }

  showFaves() {
    let view = this.state.viewFaves;
    this.setState({ viewFaves: !view })
  }

  clearLs() {
    localStorage.clear();
    this.setState({ favorites: {} });
    console.log('Cleared!')
  }


  render() {
    return (
      <div className='container'>
        <Search
          searchTerm={this.state.searchTerm}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
        <List clickedItem={this.itemClicked}
          viewList={this.state.viewList && this.state.searchTerm !== ""}
          results={this.state.searchResults}
          favorites={this.state.favorites}
          toggleFav={this.toggleFav} />
        <Button onClick={() => this.showFaves()}
          text='Favorites' />
        <List clickedItem={this.itemClicked}
          viewList={this.state.viewFaves}
          results={Object.values(this.state.favorites)}
          favorites={this.state.favorites}
          toggleFav={this.toggleFav} />
          <Button onClick={() => this.clearLs()} text='clear' />
        <Movie movie={this.state.movie}
        favorites={this.state.favorites}
          toggleFav={this.toggleFav} />

      </div>
    )
  }
}

export default App;