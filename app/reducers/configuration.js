/*
* @Author: ryan
* @Date:   2016-11-28 17:14:27
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 10:37:39
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
			const newParam = action.param.set("value", action.value)
			const newParams = state.get("ga").set(newParam.get("id"), newParam)
			return state.merge(Immutable.Map({ga: newParams}))
		default:
			return state
	}
}

export default config