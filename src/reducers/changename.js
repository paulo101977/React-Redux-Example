const changeName = (state = {}, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
        return {
          name: action.text
        }

    default:
      return state
  }
}

export default changeName;
