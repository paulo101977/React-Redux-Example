

//below, each action

import Axios from 'axios';

var instance = Axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 4000,
  method: 'get'
});

//request for repositories in github with axios
export function makeRequest(text){
  return function(dispatch){
    return instance('search/repositories?q=topic:' + text)
      .then((response)=>{
        if(response.statusText === 'OK'){
          setTimeout(()=>{
            dispatch(receivedata(response.data))
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

export const receivedata = (data) =>{

  return{
    type: 'RECEIVE_DATA',
    data: data.items
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
