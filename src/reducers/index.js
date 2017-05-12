

import { combineReducers } from 'redux';

import changeName from './changename';
import changeText from './changetext';
import makeRequest from './makerequest';
import isLoading from './isloading';
import getItem from './getitem';


//combine each reducers to unique store
const reduxApp = combineReducers({
  changeName,
  changeText,
  makeRequest,
  isLoading,
  getItem
})

export default reduxApp;
