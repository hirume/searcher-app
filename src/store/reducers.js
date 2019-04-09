
const initialState = {
  loading: false,
  movies: null,
  currentMovie: { "Title": "Love", "Year": "2015", "Rated": "Not Rated", "Released": "30 Oct 2015", "Runtime": "135 min", "Genre": "Drama, Romance", "Director": "Gaspar Noé", "Writer": "Gaspar Noé", "Actors": "Aomi Muyock, Karl Glusman, Klara Kristin, Ugo Fox", "Plot": "Murphy is an American living in Paris who enters a highly sexually and emotionally charged relationship with the unstable Electra. Unaware of the effect it will have on their relationship, they invite their pretty neighbor into their bed.", "Language": "English, French", "Country": "France, Belgium", "Awards": "2 wins & 1 nomination.", "Poster": "https://m.media-amazon.com/images/M/MV5BMTQzNDUwODk5NF5BMl5BanBnXkFtZTgwNzA0MDQ2NTE@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "6.1/10" }, { "Source": "Metacritic", "Value": "51/100" }], "Metascore": "51", "imdbRating": "6.1", "imdbVotes": "34,868", "imdbID": "tt3774694", "Type": "movie", "DVD": "15 Mar 2016", "BoxOffice": "$176,061", "Production": "Alchemy", "Website": "N/A", "Response": "True" },
  error: null,
  searchTerm: '',
  faves: [{ "Title": "Love", "Year": "2015", "Rated": "Not Rated", "Released": "30 Oct 2015", "Runtime": "135 min", "Genre": "Drama, Romance", "Director": "Gaspar Noé", "Writer": "Gaspar Noé", "Actors": "Aomi Muyock, Karl Glusman, Klara Kristin, Ugo Fox", "Plot": "Murphy is an American living in Paris who enters a highly sexually and emotionally charged relationship with the unstable Electra. Unaware of the effect it will have on their relationship, they invite their pretty neighbor into their bed.", "Language": "English, French", "Country": "France, Belgium", "Awards": "2 wins & 1 nomination.", "Poster": "https://m.media-amazon.com/images/M/MV5BMTQzNDUwODk5NF5BMl5BanBnXkFtZTgwNzA0MDQ2NTE@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "6.1/10" }, { "Source": "Metacritic", "Value": "51/100" }], "Metascore": "51", "imdbRating": "6.1", "imdbVotes": "34,868", "imdbID": "tt3774694", "Type": "movie", "DVD": "15 Mar 2016", "BoxOffice": "$176,061", "Production": "Alchemy", "Website": "N/A", "Response": "True" }],
  id: 'tt3774694',
  currentPage: 1,
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return { ...state, searchTerm: action.payload, loading: true, error: null };
    case 'SEARCH_SUCCESS':
      return { ...state, loading: false, movies: action.movies };
    case 'SEARCH_FAILURE':
      return { ...state, loading: false, movies: null, error: action.error };
    case 'ADD_FAV':
      return { ...state, faves: [...state.faves, action.payload] };
      case 'DELETE_FAV':
      let newFavs = state.faves.filter(mv => mv.imdbID !== action.payload.imdbID)
      return {...state, faves: newFavs};
    case 'GET_MOVIE':
      return { ...state, id: action.payload, error: null };
    case 'GET_MOVIE_SUCCESS':
      return { ...state, loading: false, currentMovie: action.movie };
    case 'GET_MOVIE_FAILURE':
      return { ...state, loading: false, currentMovie: null, error: action.error };
    case 'LOAD_MORE':
      return { ...state, loading: true, error: null };
    case 'LOAD_MORE_SUCCESS':
      return { ...state, loading: false, movies: [...state.movies, ...action.newMovies], currentPage: action.page };
    case 'LOAD_MORE_FAILURE':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};


export default reducer;