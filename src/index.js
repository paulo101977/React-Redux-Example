import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import reduxApp from './reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

require('./styles/Main.scss')

let store = createStore(reduxApp);

let render = ()=>
      <Provider store={store}>
        <Main />
      </Provider>

// Render the main component into the dom
ReactDOM.render( render() , document.getElementById('app'));
