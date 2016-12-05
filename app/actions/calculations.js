/*
* @Author: ryan
* @Date:   2016-11-29 16:44:03
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 17:05:41
*/

'use strict';

import Immutable from 'immutable'
import { fuelCellRun, 
		fuelCellGAParams,
		fuelCellJPSParams,
		fuelCellConstants,
		fuelCellParams,
		fuelCellBounds } from '../machineLearning/FuelCellML'

const getActualFuelCellParams = (bounds) => {
	return fuelCellParams(
		bounds.get("x1").get("actual"),
		bounds.get("x2").get("actual"),
		bounds.get("x3").get("actual"),
		bounds.get("x4").get("actual"),
		bounds.get("y").get("actual"),
		bounds.get("Rc").get("actual"),
		bounds.get("B").get("actual")
	);
}

const getFuelCellBounds = (bounds) => {
	return fuelCellBounds(
		[bounds.get("x1").get("lower"), bounds.get("x1").get("upper")],
		[bounds.get("x2").get("lower"), bounds.get("x2").get("upper")],
		[bounds.get("x3").get("lower"), bounds.get("x3").get("upper")],
		[bounds.get("x4").get("lower"), bounds.get("x4").get("upper")],
		[bounds.get("y").get("lower"), bounds.get("y").get("upper")],
		[bounds.get("Rc").get("lower"), bounds.get("Rc").get("upper")],
		[bounds.get("B").get("lower"), bounds.get("B").get("upper")]
	);
}

const getGAParams = (params, fcBounds, actualCellParams) => {
	return fuelCellGAParams(
		params.get("ga_noise").get("value"), 
		fcBounds, 
		actualCellParams, 
		params.get("ga_maxCurrent").get("value"), 
		params.get("ga_genCount").get("value"), 
		params.get("ga_birthRate").get("value"), 
		params.get("ga_mRate").get("value"), 
		params.get("ga_pSize").get("value")
	);
}

const getJPSParams = (params, fcBounds, actualCellParams) => {
	return fuelCellJPSParams(
		params.get("jps_noise").get("value"), 
		fcBounds, 
		actualCellParams, 
		params.get("jps_maxCurrent").get("value"), 
		params.get("jps_targetCost").get("value"), 
		params.get("jps_maxEvals").get("value"), 
		params.get("jps_evalFrac").get("value"), 
		params.get("jps_alpha").get("value"), 
		params.get("jps_mRate").get("value"), 
		params.get("jps_pSize").get("value")
	);
}

const getFuelCellConstants = (constants) => {
	return fuelCellConstants(
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
}

const normalize = (results, type) => {
	const solution = results.get("solution")
	const generations = results.get("generations");
	const actualStack = results.get("actualStack").map((v,i) => [i, v]).toArray()

	let yMin = solution.solution().get(0);
	let yMax = 0;
	let xMin = 0;
	let xMax = 0;

	const bests = []
	const lines = generations.map(gen => {
		const fittest = gen.get("fittest")
		bests.push({ dna: fittest.dna().toArray(), fitness: fittest.fitness(), cost: fittest.cost() });

		return fittest.solution().map((v, i) => {
			yMin = Math.min(v, yMin);
			yMax = Math.max(v, yMax);
			xMin = Math.min(i, xMin);
			xMax = Math.max(i, xMax);
			return [i, v]
		}).toArray()
	}).toArray()

	return Immutable.Map({
		xBounds: [xMin, xMax],
		yBounds: [yMin, yMax],
		lines: lines,
		bests: bests,
		actualStack: actualStack,
		solution: solution,
		type: type
	})
}

const thenMiddleWare = (then, type) => (r, s) => { s ? then(normalize(r, type), s) : then(r, s) }

export const run = (type) => (bounds, constants, algParams, quit, then) => {

	const actualCellParams = getActualFuelCellParams(bounds)
	const fcBounds = getFuelCellBounds(bounds)
	const fcConstants = getFuelCellConstants(constants)

	switch (type) {
		case 'JPS':
			const jpsParams = getJPSParams(algParams, fcBounds, actualCellParams)
			const jpsSeed = algParams.get("jps_seed").get("value")
			fuelCellRun("JPS")(jpsSeed, fcConstants, jpsParams, quit, thenMiddleWare(then, type));
			break;
		case 'GA':
			const gaParams = getGAParams(algParams, fcBounds, actualCellParams)
			const gaSeed = algParams.get("ga_seed").get("value")
			fuelCellRun("GA")(gaSeed, fcConstants, gaParams, quit, thenMiddleWare(then, type));
	}
}

