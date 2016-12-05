/*
* @Author: ryan
* @Date:   2016-11-29 13:29:24
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:03:33
*/

'use strict';

import Immutable from 'immutable'
import {fuelCellConstants,
		fuelCellParams,
		fuelCellBounds } from '../machineLearning/FuelCellML'

import {calculations} from '../utilities/initialState'

const calcs = (state = calculations(), action) => {
	switch (action.type) {
		case 'REQUEST_ML_EXECUTION':
			return state.push(Immutable.Map({
				loading: true,
				id: action.id
			}))
		case 'RECEIVE_ML_SUCCESS':
			return state.set(action.id, action.results.merge(Immutable.Map({
				loading: false,
				type: action.algType,
				status: "SUCCESS",
				bounds: action.bounds,
				constants: action.constants,
				params: action.params,
				id: action.id
			})));
		case 'RECEIVE_ML_FAILURE':
			return state.set(action.id, Immutable.Map({
				loading: false,
				type: action.algType,
				status: "FAILURE",
				bounds: action.bounds,
				constants: action.constants,
				params: action.params,
				id: action.id
			}));
		default:
			return state;
	}
}

export default calcs
