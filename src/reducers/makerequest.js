const makeRequest = (state = {}, action) => {

  switch (action.type) {

    case 'REQUEST_DONE':
      return Object.assign({}, state, {
        loading: action.loading
      })

    case 'MAKE_REQUEST_BY_ID':
      return Object.assign({}, state, {
        itemRequest: action.request
      })

    case 'RECEIVE_DATA':
      return Object.assign({}, state, {
        data: action.data
      })

    default:
      return state
  }
}

export default makeRequest;
