const makeRequest = (state = {}, action) => {

  switch (action.type) {

    case 'REQUEST_DONE':
      return Object.assign({}, state, {
        loading: action.loading
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
