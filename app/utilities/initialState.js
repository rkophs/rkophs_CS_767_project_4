/*
* @Author: ryan
* @Date:   2016-11-28 13:24:23
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:56:11
*/

'use strict';

import Immutable from 'immutable'
import {Bounds, Constant, AlgorithmParameter} from '../utilities/ConfigurationState'

export const configuration = () => Immutable.Map({
	constants: Immutable.Map({
		nS: Constant("N(s)", "nS", "Size of stack", 24),
		A: Constant("A", "A","Membrane area, cm^2", 27),
		l: Constant("l", "l", "Membrane thickness, cm", 0.0127),
		iLimitDen: Constant("i(limit,den)", "iLimitDen", "Limiting current density, A/cm^2", 0.860),
		RHa: Constant("RH(a)", "RHa", "Annode relative humidity", 1),
		RHc: Constant("RH(c)", "RHc", "Cathode relative humidity", 1),
		T: Constant("T", "T", "Temperature, K", 353.15),
		pA: Constant("p(a)", "pA", "Annode inlet pressure, atm", 2.96077),
		pC: Constant("p(c)", "pC", "Cathode inlet pressure, atm", 4.93462)
	}),
	bounds: Immutable.Map({
		x1: Bounds("x1", "x1", "Parameter", -1.19969, -0.8532, -0.944957),
		x2: Bounds("x2", "x2","Parameter", 0.001, 0.005, 0.00301801),
		x3: Bounds("x3", "x3", "Parameter", 0.000036, 0.000098, 0.00007401),
		x4: Bounds("x4", "x4", "Parameter", -0.000260, -0.0000954, -0.000188),
		y: Bounds("y", "y", "Cell Parameter", 10, 24, 23),
		Rc: Bounds("R(c)", "Rc", "Resistance, Ohms", 0.0001, 0.0008, 0.0001),
		B: Bounds("B", "B", "Concentration loss, V", 0.0136, 0.5, 0.02914489)
	}),
	jps: Immutable.Map({
		jps_noise: AlgorithmParameter("jps_noise", "Simulation noise, [0,1]", 0.3),
		jps_maxCurrent: AlgorithmParameter("jps_maxCurrent", "Maximum current (A)", 20),
		jps_targetCost: AlgorithmParameter("jps_targetCost", "Target cost (end condition)", 1.2),
		jps_maxEvals: AlgorithmParameter("jps_maxEvals", "Number of iterations", 1000),
		jps_evalFrac: AlgorithmParameter("jps_evalFrac", "Evaluation fraction, [0, 1]", 0.1),
		jps_alpha: AlgorithmParameter("jps_alpha", "Alpha, [0, 1]", 0.999),
		jps_mRate: AlgorithmParameter("jps_mRate", "Rate of mutation", 0.2),
		jps_pSize: AlgorithmParameter("jps_pSize", "Population Size", 400),
		jps_seed: AlgorithmParameter("jps_seed", "PRG Seed", 123)
	}),
	ga: Immutable.Map({
		ga_noise: AlgorithmParameter("ga_noise", "Simulation noise, [0,1]", 0.3),
		ga_maxCurrent: AlgorithmParameter("ga_maxCurrent", "Maximum current (A)", 20),
		ga_genCount: AlgorithmParameter("ga_genCount", "Number of generations", 100),
		ga_birthRate: AlgorithmParameter("ga_birthRate", "Child rate per couple", 2),
		ga_mRate: AlgorithmParameter("ga_mRate", "Rate of mutation", 0.1),
		ga_pSize: AlgorithmParameter("ga_pSize", "Population Size", 400),
		ga_seed: AlgorithmParameter("ga_seed", "PRG Seed", 123)
	})
})

export const calculations = () => Immutable.List([])

export const ui = () => Immutable.Map({
	visibleRun: -1,
	speed: 10
})
