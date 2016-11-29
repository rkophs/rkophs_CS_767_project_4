let nextGaRun = 0

export const runGA = (bounds, constants, gaParams) => {
	return {
    type: "RUN_GA",
    bounds,
    constants,
    gaParams,
    id: nextGaRun++
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