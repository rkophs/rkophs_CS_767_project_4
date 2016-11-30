/*
* @Author: ryan
* @Date:   2016-11-29 17:28:21
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 02:31:30
*/

'use strict';

import Immutable from 'immutable'

const defaultLoading = Immutable.Map({
	visibleRun: -1,
	speed: 10
})

const ui = (state = defaultLoading, action) => {
	switch(action.type) {
		case 'CHANGE_RUN_DISPLAY':
			return state.merge(Immutable.Map({ visibleRun: action.run.get("id") }));
		default:
			return state;
	}
}

export default ui