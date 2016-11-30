import { combineReducers } from 'redux'
import configuration from './configuration'
import calculations from './calculations'
import ui from './ui'

const app = combineReducers({
  configuration,
  calculations,
  ui
})

export default app
