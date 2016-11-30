/*
* @Author: ryan
* @Date:   2016-11-28 16:05:01
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 13:54:08
*/

'use strict';

import Immutable from 'immutable'

export const Bounds = (html, id, description, lower, upper, actual) => {
	return Immutable.Map({html, id, description, lower, upper, actual});
}

export const Constant = (html, id, description, value) => {
	return Immutable.Map({html, id, description, value});
}

export const AlgorithmParameter = (id, description, value) => {
	return Immutable.Map({id, description, value});
}