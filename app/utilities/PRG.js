/*
* @Author: ryan
* @Date:   2016-11-23 11:10:10
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-23 11:14:05
*/

'use strict';

import MersenneTwister from 'mersenne-twister'

class PRG {

	constructor(seed) {
		this.gen = new MersenneTwister(seed);
	}

	random() {
		return this.gen.random();
	}
}

export default PRG 