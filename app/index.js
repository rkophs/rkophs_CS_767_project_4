
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import style from "./style/base.scss"

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
