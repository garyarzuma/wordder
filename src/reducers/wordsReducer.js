const wordsReducer = (state = { toWord:'sage', fromWord:'fool',correctGuessesArray:[] }, action) => {
  switch(action.type) {
  case 'NEW_TO_WORD':
    return { ...state, toWord: action.data }
  case 'NEW_FROM_WORD':
    return { ...state, fromWord: action.data }
  case 'SET_GUESSES':
    return { ...state, correctGuessesArray: action.data }
  default:
    return state
  }
}

export default wordsReducer

export const setToWord = (toWord) => {
  return {
    type: 'NEW_TO_WORD',
    data: toWord,
  }
}

export const setFromWord = (fromWord) => {
  return {
    type: 'NEW_FROM_WORD',
    data: fromWord,
  }
}

export const setCorrectGuessesArray = (array) => {
  return {
    type: 'SET_GUESSES',
    data: array,
  }
}