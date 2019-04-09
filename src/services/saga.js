import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { searchMovies, getMovie } from './api.js';
import { getSearchTerm, getID, getPage } from './selectors';

//search

export function* watcherSearch() {
  yield takeLatest('SEARCH_REQUEST', workerSearch);
}

function* workerSearch() {
  try {
    const searchTerm = yield select(getSearchTerm);
    const response = yield call(searchMovies, searchTerm);
    const movies = response.data.Search;
    yield put({ type: 'SEARCH_SUCCESS', movies });

  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error });
  }
}

//moar
export function* watcherLoadMore() {
  yield takeLatest('LOAD_MORE', workerLoadMore);
}

function* workerLoadMore() {
  try {
    const searchTerm = yield select(getSearchTerm);
    let page = yield select(getPage);
    yield page = page + 1;
    const response = yield call(searchMovies, searchTerm, page);
    const newMovies = response.data.Search;
    yield put({ type: 'LOAD_MORE_SUCCESS', newMovies, page });

  } catch (error) {
    yield put({ type: 'LOAD_MORE_FAILURE', error });
  }
}

// get movie
export function* watcherGetMovie() {
  yield takeLatest('GET_MOVIE', workerGetMovie);
}

function* workerGetMovie() {
  try {
    const id = yield select(getID);
    const response = yield call(getMovie, id);
    const movie = response.data;
    yield put({ type: 'GET_MOVIE_SUCCESS', movie });

  } catch (error) {
    yield put({ type: 'GET_MOVIE_FAILURE', error });

  }
}



export function* rootSaga() {
  yield all([
    watcherSearch(),
    watcherLoadMore(),
    watcherGetMovie(),
  ])
}