// eslint-disable-next-line
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import "./Movie.css";


class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFav: false
    }
    this.addFav = this.addFav.bind(this);
    this.deleteFav = this.deleteFav.bind(this)
  }

  componentDidMount() {
    this.props.onGetMovie(this.props.match.params.id);
    if (this.props.faves.map(item => item.imdbID).includes(this.props.currentMovie.imdbID)) {
      this.setState({
        isFav: true
      })
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
      return <Loading />
    }

    if (this.props.currentMovie) {
      return (
        <div className='movie-card'>
          <div className='image-container'>
            <img src={this.props.currentMovie.Poster} alt="Poster" className="poster"></img>
            <div className='favheart-lg'>{this.state.isFav ? <svg onClick={() => this.deleteFav()} xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path fill="#f26627" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              :
              <svg onClick={() => this.addFav()} xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path fill="#f26627" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>}
            </div>
          </div>

          <div className='text-container'>
          <div className='movie-title'><h1>{this.props.currentMovie.Title} ({this.props.currentMovie.Year})</h1>
            <p className='imdb-rating'>{this.props.currentMovie.imdbRating}</p></div>
            <p className='info-section'>{this.props.currentMovie.Plot}</p>
          </div>

        </div>

      )
    }

    else return <p>Something went wrong!</p>
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onGetMovie: (id) => dispatch({ type: 'GET_MOVIE', payload: id }),
    onAddFav: (mv) => dispatch({ type: 'ADD_FAV', payload: mv }),
    onDeleteFav: (mv) => dispatch({ type: 'DELETE_FAV', payload: mv })
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Movie));