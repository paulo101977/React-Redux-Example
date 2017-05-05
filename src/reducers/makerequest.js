const makeRequest = (state = {}, action) => {

  switch (action.type) {
    case 'MAKE_REQUEST':
        return {
          request: action.request
        }

    default:
      return state
  }
}

export default makeRequest;
