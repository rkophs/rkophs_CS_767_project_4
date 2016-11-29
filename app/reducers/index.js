import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import configuration from './configuration'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  configuration
})

export default todoApp
