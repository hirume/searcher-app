import axios from "axios";

const API_KEY = "662e4552";
export function searchMovies(searchTerm, pageNumber = 1) {
  return axios.get(
    `//www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${pageNumber}`
  );
}

export function getMovie(id) {
  return axios.get(`//www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
}
