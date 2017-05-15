

//below, each action

import Axios from 'axios';

var instance = Axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 4000,
  method: 'get'
});

//request for repositories in github with axios
export const makeRequest = (text)=> {
  return{
    type: 'MAKE_REQUEST',
    request: instance('search/repositories?q=topic:' + text)
  }
}

//request for repositories in github with axios
export const getRequestById = (id)=> {
  return{
    type: 'MAKE_REQUEST_BY_ID',
    request: instance('repositories/' + id)
  }
}

//travel to next router and pass the item to component
export const getItem = (item)=> {
  return{
    type: 'GET_ITEM',
    item: item
  }
}

export const isLoading = (loading) =>{

  return{
    type: 'REQUEST_DONE',
    loading: loading
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
