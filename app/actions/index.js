import { run } from './calculations'

let nextRun = 0

export const requestExecution = (id) => {
	return {
		type: "REQUEST_ML_EXECUTION",
		id
	}
}

export const receiveResults = (algType, bounds, constants, params, id, results, success) => {
	if (success) {
		return { type: "RECEIVE_ML_SUCCESS", algType, bounds, constants, params, id, results } 
	} else {
		return { type: "RECEIVE_ML_FAILURE", algType, bounds, constants, params, id } 
	}
}

export const executeRun = (type, bounds, constants, params) => {
	return dispatch => {
		const id = nextRun++;
		dispatch(requestExecution(id))
		run(type)(bounds, constants, params, () => false, (result, success) => {
			dispatch(receiveResults(type, bounds, constants, params, id, result, success))
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

export const updateJPSParam = (param, value) => {
	return {
		type: "UPDATE_JPS_PARAM",
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
