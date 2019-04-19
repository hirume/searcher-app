import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducer from "./store/reducers";
import { rootSaga } from "./services/saga";
import { loadState, saveState } from './services/localStorage';


const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
, document.getElementById("root"));
