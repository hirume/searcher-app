// eslint-disable-next-line
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";
import { Error } from './Error';
import Heart from "./Heart";
import "./Movie.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false
    };
    this.addFav = this.addFav.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
  }

  componentDidMount() {
    this.props.onGetMovie(this.props.match.params.id);
    if (
      this.props.faves
        .map(item => item.imdbID)
        .includes(this.props.currentMovie.imdbID)
    ) {
      this.setState({
        isFav: true
      });
    }
  }

  addFav() {
    this.props.onAddFav(this.props.currentMovie);
    this.setState({ isFav: true });
  }

  deleteFav() {
    this.props.onDeleteFav(this.props.currentMovie);
    this.setState({ isFav: false });
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    if (this.props.currentMovie) {
      return (
        <div className="movie-card">
          <div className="image-container">
            <img
              src={this.props.currentMovie.Poster}
              alt="Poster"
              className="poster"
            />
            <div className="favheart-lg">
              {this.state.isFav ? (
                <Heart
                  onClick={this.deleteFav}
                  size={72}
                  name="full"
                  color="#00d4c3"
                />
              ) : (
                <Heart
                  onClick={this.addFav}
                  size={72}
                  name="empty"
                  color="#00d4c3"
                />
              )}
            </div>
          </div>

          <div className="text-container">
            <div className="movie-title">
              <h1>
                {this.props.currentMovie.Title} ({this.props.currentMovie.Year})
              </h1>
              <p className="imdb-rating">
                {this.props.currentMovie.imdbRating}
              </p>
            </div>
            <p className="info-section">{this.props.currentMovie.Plot}</p>
          </div>
        </div>
      );
    } else return <Error text='Something went wrong!' />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetMovie: id => dispatch({ type: "GET_MOVIE", payload: id }),
    onAddFav: mv => dispatch({ type: "ADD_FAV", payload: mv }),
    onDeleteFav: mv => dispatch({ type: "DELETE_FAV", payload: mv })
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Movie)
);
