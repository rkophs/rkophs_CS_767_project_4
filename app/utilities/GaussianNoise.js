/*
* @Author: ryan
* @Date:   2016-12-01 17:14:25
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 17:50:19
*/

'use strict';

const noise = (prg, sigma, mean) => {
	const u = 1 - prg.random()
	const v = 1 - prg.random()
	const res = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(Math.PI * 2 * v);
	return res * sigma + mean
}

export default noise