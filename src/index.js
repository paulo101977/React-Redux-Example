import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import reduxApp from './reducers/index';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let store = createStore(reduxApp);

let render = ()=>
      <Provider store={store}>
        <App />
      </Provider>

// Render the main component into the dom
ReactDOM.render( render() , document.getElementById('app'));
