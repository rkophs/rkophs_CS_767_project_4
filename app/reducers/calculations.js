/*
* @Author: ryan
* @Date:   2016-11-29 13:29:24
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 10:37:43
*/

'use strict';

import Immutable from 'immutable'
import { fuelCellGARun, 
		fuelCellGAParams,
		fuelCellConstants,
		fuelCellParams,
		fuelCellBounds } from '../machineLearning/FuelCellGA'

import {calculations} from '../utilities/initialState'

const calcs = (state = calculations(), action) => {
	switch (action.type) {
		case 'REQUEST_GA_EXECUTION':
			return state.push(Immutable.Map({
				loading: true,
				id: action.id,
				type: "GA"
			}))
		case 'RECEIVE_GA_SUCCESS':
			return state.set(action.id, Immutable.Map({
				loading: false,
				type: "GA",
				status: "SUCCESS",
				results: action.results,
				bounds: action.bounds,
				constants: action.constants,
				gaParams: action.gaParams,
				id: action.id
			}));
		case 'RECEIVE_GA_FAILURE':
			return state.set(action.id, Immutable.Map({
				loading: false,
				type: "GA",
				status: "FAILURE",
				bounds: action.bounds,
				constants: action.constants,
				gaParams: action.gaParams,
				id: action.id
			}));
		default:
			return state;
	}
}

export default calcs
