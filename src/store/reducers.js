
const initialState = {
  loading: false,
  movies: [],
  currentMovie: {"Title":"Apocalypse Now","Year":"1979","Rated":"R","Released":"15 Aug 1979","Runtime":"147 min","Genre":"Drama, War","Director":"Francis Ford Coppola","Writer":"John Milius, Francis Ford Coppola, Michael Herr (narration)","Actors":"Marlon Brando, Martin Sheen, Robert Duvall, Frederic Forrest","Plot":"A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.","Language":"English, French, Vietnamese","Country":"USA","Awards":"Won 2 Oscars. Another 18 wins & 31 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BZTNkZmU0ZWQtZjQzMy00YTNmLWFmN2MtZGNkMmU1OThmMGYwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"94/100"}],"Metascore":"94","imdbRating":"8.5","imdbVotes":"541,993","imdbID":"tt0078788","Type":"movie","DVD":"20 Nov 2001","BoxOffice":"N/A","Production":"United Artists","Website":"https://www.zoetrope.com/american-zoetrope/apocalypse.now","Response":"True"},
  error: null,
  searchTerm: '',
  faves: [],
  id: 'tt0078788',
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
      return { ...state, id: action.payload, loading: true, error: null };
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