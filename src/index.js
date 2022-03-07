import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore , combineReducers } from 'redux'

import wordsReducer from './reducers/wordsReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  words: wordsReducer,
  user: userReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'))


