/*
* @Author: ryan
* @Date:   2016-11-29 16:44:03
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 20:33:53
*/

'use strict';

import Immutable from 'immutable'
import { fuelCellGARun, 
		fuelCellGAParams,
		fuelCellConstants,
		fuelCellParams,
		fuelCellBounds } from '../machineLearning/FuelCellGA'

export const runGA = (bounds, constants, gaParams, quit, then) => {

	const actualCellParams = fuelCellParams(
		bounds.get("x1").get("actual"),
		bounds.get("x2").get("actual"),
		bounds.get("x3").get("actual"),
		bounds.get("x4").get("actual"),
		bounds.get("y").get("actual"),
		bounds.get("Rc").get("actual"),
		bounds.get("B").get("actual")
	);

	const fcBounds = fuelCellBounds(
		[bounds.get("x1").get("lower"), bounds.get("x1").get("upper")],
		[bounds.get("x2").get("lower"), bounds.get("x2").get("upper")],
		[bounds.get("x3").get("lower"), bounds.get("x3").get("upper")],
		[bounds.get("x4").get("lower"), bounds.get("x4").get("upper")],
		[bounds.get("y").get("lower"), bounds.get("y").get("upper")],
		[bounds.get("Rc").get("lower"), bounds.get("Rc").get("upper")],
		[bounds.get("B").get("lower"), bounds.get("B").get("upper")]
	);

	const fcParams = fuelCellGAParams(
		gaParams.get("noise").get("value"), 
		fcBounds, 
		actualCellParams, 
		gaParams.get("maxCurrent").get("value"), 
		gaParams.get("genCount").get("value"), 
		gaParams.get("birthRate").get("value"), 
		gaParams.get("mRate").get("value"), 
		gaParams.get("pSize").get("value")
	);

	const fcConstants = fuelCellConstants(
		constants.get("nS").get("value"), 
		constants.get("A").get("value"), 
		constants.get("l").get("value"), 
		constants.get("iLimitDen").get("value"), 
		constants.get("RHa").get("value"), 
		constants.get("RHc").get("value"), 
		constants.get("T").get("value"), 
		constants.get("pA").get("value"), 
		constants.get("pC").get("value")
	);

	const seed = gaParams.get("gaSeed").get("value");

	fuelCellGARun(seed, fcConstants, fcParams, quit, then);
}