import React from "react";
import Loading from "./Loading";
import List from "./List";
import { withRouter } from "react-router-dom";
import Button from "./Button";
import { Error } from "./Error";
import "./SearchResults.css";

const SearchResults = (props) => {

    const { loading, movies, onLoadMore, error, faves } = props;
    return (
      <div className="search-results">
        {movies.length > 0 ? (
          <List movies={movies} faves={faves}>
            <Button onClick={() => onLoadMore()} text={"Load more"} />
          </List>
        ) : (
          <p>Search for something, e.g. "Only You" or "Wonder"</p>
        )}
        {loading ? <Loading /> : null}
        {error && <Error text="An error has occured" />}
      </div>
    );
  }
  
   


export default withRouter(SearchResults);
