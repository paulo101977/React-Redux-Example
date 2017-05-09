const isLoading = (state = {}, action) => {

  switch (action.type) {
    case 'REQUEST_DONE':
      return {
        loading: action.loading
      }

    default:
      return state
  }
}

export default isLoading;
