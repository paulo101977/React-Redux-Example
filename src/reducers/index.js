

import { combineReducers } from 'redux'

import {changeName} from './changename'
import {changeText} from './changetext'

//combine each reducers to unique store
const reduxApp = combineReducers({
  changeName,
  changeText
})

export default reduxApp;
