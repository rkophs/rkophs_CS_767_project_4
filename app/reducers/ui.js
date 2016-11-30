/*
* @Author: ryan
* @Date:   2016-11-29 17:28:21
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 10:37:48
*/

'use strict';

import Immutable from 'immutable'

import { ui } from '../utilities/initialState'

const uiReducer = (state = ui(), action) => {
	switch(action.type) {
		case 'CHANGE_RUN_DISPLAY':
			return state.merge(Immutable.Map({ visibleRun: action.run.get("id")}));
		default:
			return state;
	}
}

export default uiReducer