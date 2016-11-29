/*
* @Author: ryan
* @Date:   2016-11-28 17:14:27
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 11:14:26
*/

'use strict';

import Immutable from 'immutable'

const defaultConfigState = Immutable.Map({
	bounds: Immutable.Map({}), 
	constants: Immutable.Map({}),
	ga: Immutable.Map({})
});

const configuration = (state = defaultConfigState, action) => {
	switch (action.type) {
		case 'UPDATE_CONFIG_BOUNDS':
			const newBound = action.bound.set(action.key, action.value)
			const newBounds = state.get("bounds").set(newBound.get("id"), newBound)
			return state.merge(Immutable.Map({bounds: newBounds}))
		case 'UPDATE_CONFIG_CONSTANT':
			const newConstant = action.constant.set("value", action.value)
			const newConstants = state.get("constants").set(newConstant.get("id"), newConstant)
			return state.merge(Immutable.Map({constants: newConstants}))
		case 'UPDATE_GA_PARAM':
			const newParam = action.param.set("value", action.value)
			const newParams = state.get("ga").set(newParams.get("id"), newParam)
			return state.merge(Immutable.Map({ga: newParams}))
		case 'RUN_GA': 
			console.log(action)
			return state
		default:
			return state
	}
}

export default configuration