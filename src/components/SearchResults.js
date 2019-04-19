import React, { Component } from "react";
import Loading from "./Loading";
import List from "./List";
import { withRouter } from "react-router-dom";
import Button from "./Button";
import { Error } from "./Error";
import "./SearchResults.css";

class SearchResults extends React.Component {
  render() {
    const { loading, movies, onLoadMore, error, faves } = this.props;
    return (
      <div className="search-results">
        {movies ? (
          <List movies={movies} faves={faves}>
            <Button onClick={() => onLoadMore()} text={"Load more"} />
          </List>
        ) : (
          <p>Nothing found</p>
        )}
        {loading ? <Loading /> : null}
        {error && <Error text="An error has occured" />}
      </div>
    );
  }
}

export default withRouter(SearchResults);
