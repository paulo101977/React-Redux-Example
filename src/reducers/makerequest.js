const makeRequest = (state = {}, action) => {

  switch (action.type) {

    case 'REQUEST_DONE':
      return Object.assign({}, state, {
        loading: action.loading
      })

    case 'RECEIVE_BY_ID':
      return Object.assign({}, state, {
        itemData: action.itemData
      })

    case 'RECEIVE_MORE_DATA':
      return Object.assign({} , state,
        {
          data: state.data.concat(action.data)
        }
      )

    case 'RECEIVE_DATA':
      return Object.assign({}, state, {
        data: action.data,
        text: action.text,
        page: action.page
      })

    default:
      return state
  }
}

export default makeRequest;
