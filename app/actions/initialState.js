/*
* @Author: ryan
* @Date:   2016-11-28 13:24:23
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 11:20:45
*/

'use strict';

import Immutable from 'immutable'
import {Bounds, Constant, AlgorithmParameter} from '../utilities/ConfigurationState'

export const initialState = () => {
	return {
		configuration: Immutable.Map({
			constants: Immutable.Map({
				nS: Constant("N(s)", "nS", "Size of stack", 24),
				A: Constant("A", "A","Membrane area, cm^2", 27),
				l: Constant("l", "l", "Membrane thickness, cm", 0.0127),
				iLimitDen: Constant("i(limit,den)", "iLimitDen", "Limiting current density, A/cm^2", 0.860),
				RHa: Constant("RH(a)", "RHa", "Annode relative humidity of vapor", 1),
				RHc: Constant("RH(c)", "RHc", "Cathode relative humidity of vapor", 1),
				T: Constant("T", "T", "Temperature, K", 353.15),
				pA: Constant("p(a)", "pA", "Annode inlet pressure, atm", 2.96077),
				pC: Constant("p(c)", "pC", "Cathode inlet pressure, atm", 4.93462)
			}),
			bounds: Immutable.Map({
				x1: Bounds("x1", "x1", "Parametric Bounds", -1.19969, -0.8532),
				x2: Bounds("x2", "x2","Parametric Bounds", 0.0001, 0.0005),
				x3: Bounds("x3", "x3", "Parametric Bounds", 0.000036, 0.000098),
				x4: Bounds("x4", "x4", "Parametric Bounds", -0.0000260, -0.0000954),
				y: Bounds("y", "y", "Cell Parameter Bounds", 10, 24),
				Rc: Bounds("R(c)", "Rc", "Resistance, Ohms", 0.0001, 0.0008),
				B: Bounds("B", "B", "Concentration loss, V", 0.0136, 0.5)
			}),
			ga: Immutable.Map({
				noise: AlgorithmParameter("noise", "Stack simulutation noise, [0,1]", 0.3), 
				maxCurrent: AlgorithmParameter("maxCurrent", "Maximum current (A)", 25),
				genCount: AlgorithmParameter("genCount", "Number of generations", 1000), 
				birthRate: AlgorithmParameter("birthRate", "Child rate per couple", 2), 
				mRate: AlgorithmParameter("mRate", "Rate of chromosomal mutation", 0.002), 
				pSize: AlgorithmParameter("pSize", "Population Size", 100)
			})
		})
	}
}