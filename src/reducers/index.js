

import { combineReducers } from 'redux';

import changeName from './changename';
import changeText from './changetext';
import makeRequest from './makerequest';
import isLoading from './isloading';


//combine each reducers to unique store
const reduxApp = combineReducers({
  changeName,
  changeText,
  makeRequest,
  isLoading
})

export default reduxApp;
