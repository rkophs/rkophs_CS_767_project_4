
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import {initialState} from './actions/initialState'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'

import reducer from './reducers'

const initState = initialState();
const store = createStore(reducer, initState) 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
