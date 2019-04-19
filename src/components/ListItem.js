import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Heart from "./Heart";
import "./ListItem.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false
    };

    this.addFav = this.addFav.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
  }

  componentDidMount() {
    if (
      this.props.faves
        .map(item => item.imdbID)
        .includes(this.props.movie.imdbID)
    ) {
      this.setState({
        isFav: true
      });
    }
  }

  addFav() {
    this.props.onAddFav(this.props.movie);
    this.setState({ isFav: true });
  }

  deleteFav() {
    this.props.onDeleteFav(this.props.movie);
    this.setState({ isFav: false });
  }

  render() {
    return (
      <div key={this.props.movie.imdbID} className="movie-item">
        <div className="list-movie-image-container">
          <Link to={`/movie/${this.props.movie.imdbID}`}>
            <img
              className="list-movie-image"
              src={this.props.movie.Poster}
              alt="Poster"
            />
          </Link>
          <div className="favheart-sm">
            {this.state.isFav ? (
              <Heart
                onClick={this.deleteFav}
                size={24}
                name="full"
                color="#00d4c3"
              />
            ) : (
              <Heart
                onClick={this.addFav}
                size={24}
                name="empty"
                color="#00d4c3"
              />
            )}
          </div>
        </div>

        <div className="list-movie-title">{this.props.movie.Title}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddFav: mv => dispatch({ type: "ADD_FAV", payload: mv }),
    onDeleteFav: mv => dispatch({ type: "DELETE_FAV", payload: mv })
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ListItem)
);
