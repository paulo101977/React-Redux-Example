import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import reduxApp from './reducers/index';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'

//const loggerMiddleware = createLogger();

require('./styles/Main.scss')

//let store = createStore(reduxApp);
const store = createStore(
  reduxApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    //loggerMiddleware // neat middleware that logs actions
  )
)

let render = ()=>
      <Provider store={store}>
        <Main />
      </Provider>

// Render the main component into the dom
ReactDOM.render( render() , document.getElementById('app'));
