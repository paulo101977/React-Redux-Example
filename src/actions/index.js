

//below, each action

import Axios from 'axios';

var instance = Axios.create({
  baseURL: 'https://api.github.com/search/',
  timeout: 1000,
  method: 'get'
});

//request test with axios
export const makeRequest = (text)=> {
  return{
    type: 'MAKE_REQUEST',
    request: instance('/repositories?q=topic:' + text)
  }
}

export const changeText = (text) => {
  return {
    type: 'CHANGE_TEXT',
    text
  }
}

export const changeName = (text) => {
  return {
    type: 'CHANGE_NAME',
    text
  }
}
