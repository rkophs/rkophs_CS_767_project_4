/*
* @Author: ryan
* @Date:   2016-12-01 18:14:27
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 18:22:07
*/

'use strict';

import Immutable from 'immutable'

const Range = (start, size) => {
	return {
		map: (cb) => {
			const list = []
			for (let i = start; i < start + size; i++) {
				list.push(cb(i, i))
			}
			return Immutable.List(list)
		}
	}
}

export default Range