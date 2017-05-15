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

    case 'MAKE_REQUEST':
      return Object.assign({}, state, {
        request: action.request
      })

    default:
      return state
  }
}

export default makeRequest;
