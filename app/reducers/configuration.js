/*
* @Author: ryan
* @Date:   2016-11-28 17:14:27
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:11:46
*/

'use strict';

import Immutable from 'immutable'

import { configuration } from '../utilities/initialState'

const config = (state = configuration(), action) => {
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
			const newGaParam = action.param.set("value", action.value)
			const newGaParams = state.get("ga").set(newGaParam.get("id"), newGaParam)
			return state.merge(Immutable.Map({ga: newGaParams}))
		case 'UPDATE_JPS_PARAM':
			const newJpsParam = action.param.set("value", action.value)
			const newJpsParams = state.get("jps").set(newJpsParam.get("id"), newJpsParam)
			return state.merge(Immutable.Map({jps: newJpsParams}))
		default:
			return state
	}
}

export default config