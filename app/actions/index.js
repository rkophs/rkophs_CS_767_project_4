import { runGA } from './calculations'

let nextGaRun = 0

export const requestGAExecution = (bounds, constants, gaParams, id) => {
  return {
    type: "REQUEST_GA_EXECUTION",
    id
  }
}

export const receiveGAResults = (bounds, constants, gaParams, id, results, success) => {
  if (success) {
    return { type: "RECEIVE_GA_SUCCESS", bounds, constants, gaParams, id, results } 
  } else {
    return { type: "RECEIVE_GA_FAILURE", bounds, constants, gaParams, id } 
  }
}

export const executeGA = (bounds, constants, gaParams) => {
  return dispatch => {
    const id = nextGaRun++;
    dispatch(requestGAExecution(bounds, constants, gaParams, id))
    runGA(bounds, constants, gaParams, () => false, (result, success) => {
      dispatch(receiveGAResults(bounds, constants, gaParams, id, result, success))
    });
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

export const changeRunDisplay = (id) => {
  return {
    type: "CHANGE_RUN_DISPLAY",
    id
  }
}

export const changeSpeed = (speed) => {
  return {
    type: "CHANGE_SPEED",
    speed
  }
}
