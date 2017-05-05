

import { combineReducers } from 'redux';

import changeName from './changename';
import changeText from './changetext';
import makeRequest from './makerequest';


//combine each reducers to unique store
const reduxApp = combineReducers({
  changeName,
  changeText,
  makeRequest
})

export default reduxApp;
