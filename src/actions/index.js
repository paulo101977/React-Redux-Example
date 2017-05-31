

//below, each action

import Axios from 'axios';

//TODO: change any request to 'isomorphic-fetch';
import fetch from 'isomorphic-fetch';

var instance = Axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 4000,
  method: 'get'
});

//request for repositories in github with axios
export function makeRequest(text){

  return dispatch => {
    dispatch(isLoading(true));

    return fetch(
      'https://api.github.com/search/repositories?q=topic:' + text,
      {method: 'GET', timeout: 4000}
    )
      .then(res => res.json())
      .then(json => {
          dispatch(receivedata(json , text))
          dispatch(isLoading(false));
      })
      .catch(error => {
        //TODO: dispatch error here
        dispatch(receiveError(error))
        dispatch(isLoading(false))
      })

  }
}

//request for repositories in github with axios
export function loadMore(text,page){

  let searchString = `search/repositories?q=topic:${text}&page=${page}`;


  return function(dispatch){
    dispatch(isLoading(true));

    return instance(searchString)
      .then((response)=>{
        if(response.statusText === 'OK'){
          setTimeout(()=>{
            dispatch(receiveMoreData(response.data))
            dispatch(isLoading(false));
          }, 1000)

        }
      })
      .catch((error)=>{
        setTimeout(()=>{
          //TODO: dispatch error here
          dispatch(receiveError(error))
          dispatch(isLoading(false))
        }, 1000)
      })
  }
}

//dispatch request by id
export function makeRequestById(id){

  return function(dispatch){
    dispatch(isLoading(true));

    return instance('/repositories/' + id)
      .then((response)=>{
        if(response.statusText === 'OK'){
          setTimeout(()=>{
            dispatch(receiveDataById(response.data))
            dispatch(isLoading(false));
          }, 1000)

        }
      })
      .catch((error)=>{
        setTimeout(()=>{
          //TODO: dispatch error here
          dispatch(receiveError(error))
          dispatch(isLoading(false))
        }, 1000)
      })
  }
}

export const receiveMoreData = (data)=> {
  return{
    type: 'RECEIVE_MORE_DATA',
    data: data.items
  }
}

//receive data for repositories in github with axios
export const receiveDataById = (data)=> {
  return{
    type: 'RECEIVE_BY_ID',
    itemData: data
  }
}

//travel to next router and pass the item to component
export const getItem = (item)=> {
  return{
    type: 'GET_ITEM',
    item: item
  }
}

export const receivedata = (data , text) =>{

  return{
    type: 'RECEIVE_DATA',
    data: data.items,
    text: text,
    page: 1
  }
}

export const receiveError = (error) =>{

  return{
    type: 'RECEIVE_ERROR',
    error: error
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
