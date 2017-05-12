const getItem = (state = {}, action) => {

  switch (action.type) {
    case 'GET_ITEM':
        return {
          item: action.item
        }

    default:
      return state
  }
}

export default getItem;
