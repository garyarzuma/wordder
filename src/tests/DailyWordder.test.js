import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import DailyWordder from '../components/DailyWordder'

import { Provider } from 'react-redux'
import { createStore , combineReducers } from 'redux'

import wordsReducer from '../reducers/wordsReducer'
import userReducer from '../reducers/userReducer'

//**********************************//
//Unit test for Set Todays Word Algo//
//**********************************//


let dateTable = []
const today = new Date()
const [year, month, day] = [ today.getFullYear(), today.getMonth(), today.getDate()]
//Tests next 60 days of words//
for (let i=1; i<60; i++){
  const date = new Date(year,month+2,day+i)
  dateTable.push(date)
}

const reducer = combineReducers({
  words: wordsReducer,
  user: userReducer
})

const store = createStore(reducer)

test.each(dateTable)('Word of %s actually makes a valid path', (date) => {
  jest
    // eslint-disable-next-line no-undef
    .spyOn(global, 'Date')
    .mockImplementation(() => date)

  render(
    <Provider store={store}>
      <DailyWordder />
    </Provider>
  )

  let element = screen.getByText('Wordder!')
  expect(element).toBeDefined()
})