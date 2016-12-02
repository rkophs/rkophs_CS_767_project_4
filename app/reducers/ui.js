/*
* @Author: ryan
* @Date:   2016-11-29 17:28:21
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 18:39:17
*/

'use strict';

import Immutable from 'immutable'

import { ui } from '../utilities/initialState'

const uiReducer = (state = ui(), action) => {
	switch(action.type) {
		case 'CHANGE_RUN_DISPLAY':
			return state.merge(Immutable.Map({ visibleRun: action.id}));
		case 'CHANGE_SPEED':
			return state.merge(Immutable.Map({ speed: action.speed}));
		default:
			return state;
	}
}

export default uiReducer