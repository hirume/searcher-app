import React, { Component } from 'react';

class FavHeart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorited: false,
        }
        
        this.toggleFavItem = this.toggleFavItem.bind(this);
    }

    componentDidMount() {
        if (Object.keys(this.props.favorites).includes(this.props.movie.imdbID)) {
            this.setState({
                favorited: true
            })
        }
    }

    toggleFavItem = () => {
        let fav = this.state.favorited;
        this.setState({ favorited: !fav });
        this.props.toggleFav(this.props.movie.imdbID, this.props.movie);
    }


    render() {
        return (
            this.state.favorited ?
                <button onClick={() => this.toggleFavItem()}>Del</button>
                :
                <button onClick={() => this.toggleFavItem()}>Add</button>
        )
    }
}

export default FavHeart;