

const changeText = (state = {}, action) => {

  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        text: action.text
      }

    case 'CHANGE_NAME':
        return {
          text: action.text
        }

    default:
      return state
  }
}

export default changeText;
