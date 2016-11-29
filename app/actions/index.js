let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const runGA = (bounds, constants, gaParams) => {
	return {
    type: "RUN_GA",
    bounds,
    constants,
    gaParams
  }
}

export const updateBoundsConfig = (bound, key, value) => {
  return {
    type: "UPDATE_CONFIG_BOUNDS",
    bound,
    key,
    value
  }
}

export const updateConstantsConfig = (constant, value) => {
  return {
    type: "UPDATE_CONFIG_CONSTANT",
    constant,
    value
  }
}

export const updateGAParam = (param, value) => {
  return {
    type: "UPDATE_GA_PARAM",
    param,
    value
  }
}