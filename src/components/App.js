// eslint-disable-next-line
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header.js";
import Movie from "./Movie";
import SearchResults from "./SearchResults";
import List from "./List.js";
import { ReactComponent as Popcorn } from "../imgs/popcorn.svg";
import "./App.css";

class App extends React.Component {
  render() {
    const {
      loading,
      movies,
      onSearch,
      faves,
      onLoadMore,
      error,
      currentMovie,
      id
    } = this.props;

    return (
      <Router>
        <div className="container">
          <Header onSearch={onSearch}>
            <Link to="/">
              <Popcorn />
            </Link>
            <Link to="/favorites">
              <span className="faves-link">Favorites</span>
            </Link>
          </Header>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <SearchResults
                  movies={movies}
                  loading={loading}
                  error={error}
                  onLoadMore={onLoadMore}
                  faves={faves}
                />
              )}
            />
            <Route
              exact
              path="/movie/:id"
              render={() => (
                <Movie
                  key={currentMovie.imdbID}
                  currentMovie={currentMovie}
                  faves={faves}
                  id={id}
                />
              )}
            />
            <Route
              exact
              path="/favorites"
              render={() => <List movies={faves} faves={faves} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    movies: state.movies,
    error: state.error,
    faves: state.faves,
    searchTerm: state.searchTerm,
    currentMovie: state.currentMovie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: value => dispatch({ type: "SEARCH_REQUEST", payload: value }),
    onLoadMore: () => dispatch({ type: "LOAD_MORE" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
