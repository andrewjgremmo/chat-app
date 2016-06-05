import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import socketMiddleware from './middleware/socketMiddleware';
import reducers from './reducers/';
import promise from 'redux-promise';
require("../stylesheets/app.scss");

const socket = io();
const createStoreWithMiddleware = applyMiddleware(
  promise,
  socketMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducers);

socket.on('action', function (action) {
  store.dispatch(action);
});

ReactDOM.render(
  <Provider store={store} socket={socket}>
    <Root />
  </Provider>
, document.querySelector('#root'));