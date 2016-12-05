/*
* @Author: ryan
* @Date:   2016-11-23 16:19:53
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:23:47
*/

'use strict';

import Immutable from 'immutable'
import GA from './GeneticAlgorithm'
import JPS from './JPSAlgorithm'
import fuelCellBuilder from './FuelCell'
import GeneticIndividual from './GeneticIndividual'
import PRG from '../utilities/PRG'
import GaussianNoise from '../utilities/GaussianNoise'
import Range from '../utilities/Range'

const voltage = (i, params, fuelCellV) => {
	const res = fuelCellV(i, params.get(0), params.get(1), 
		params.get(2), params.get(3), params.get(4),
		params.get(5), params.get(6));
	return res;
};

const fuelCellV = (params) => {
	return fuelCellBuilder(params.get(0), params.get(1), params.get(2), 
		params.get(3), params.get(4), params.get(5), params.get(6),
		params.get(7), params.get(8));
}

const actualStack = (prg, fuelCellV, noise, params, maxCurrent) => {
	return Range(1, maxCurrent).map((i) => {
		const n = GaussianNoise(prg, 1/3, 0)
		return voltage(i, params, fuelCellV) + n;
	});
};

const randomChr = (prg, b) => {
	return prg.random() * (b.get(1) - b.get(0)) + b.get(0);
};

const fuelCellIndividualBuilder = (prg, fcConstants, 
	fcMLParams, actual, fcCalc) => {

	const currents = Range(1, fcMLParams.maxCurrent())

	const crossover = (prg, count, dna1, dna2) => {
		return Range(0, count).map(i => {
			return dna1.map((c1, k) => {
				return prg.random() <= 0.5 ? c1 : dna2.get(k);
			}); 
		})
	};

	const mutate = (prg, rate, dna) => {
		return dna.map((chr, i) => {
			return prg.random() > rate ? chr : 
				randomChr(prg, fcMLParams.fuelCellParamBounds().get(i));
		});
	};

	const solution = (params) => {
		return currents.map((i) => {
			return voltage(i, params, fcCalc);
		});
	}

	const cost = (params) => {
		return solution(params).reduce((a, c, i) => {
			const err = actual.get(i) - c;
			return a + (err * err);
		}, 0);
	}

	const fitness = (params) => {
		return 1/cost(params);
	};

	return GeneticIndividual(crossover, mutate, fitness, cost, solution);
};

export const fuelCellParams = (n1, n2, n3, n4, y, rC, b) => {
	return Immutable.List([n1, n2, n3, n4, y, rC, b]);
};

export const fuelCellConstants = (N_s, A, l, i_limit_den, R_Ha, R_Hc, T, p_a, p_c) => {
	return Immutable.List([N_s, A, l, i_limit_den, R_Ha, R_Hc, T, p_a, p_c]); 
};

export const fuelCellBounds = (n1, n2, n3, n4, y, rC, b) => {
	return Immutable.List([Immutable.List(n1), Immutable.List(n2), 
		Immutable.List(n3), Immutable.List(n4), Immutable.List(y),
		Immutable.List(rC), Immutable.List(b)
	]);
};

export const fuelCellGAParams = (noise, paramBounds, actualFcParams, 
	maxCurrent, genCount, birthRate, mRate, pSize) => {
	return {
		noise: () => noise,
		fuelCellParamBounds: () => paramBounds,
		actualFuelCellParams: () => actualFcParams,
		maxCurrent: () => maxCurrent,
		genCount: () => genCount,
		birthRate: () => birthRate,
		mRate: () => mRate,
		populationSize: () => pSize
	}
};

export const fuelCellJPSParams = (noise, paramBounds, actualFcParams, 
	maxCurrent, targetCost, maxEvals, evalFrac, alpha, mRate, pSize) => {
	return {
		noise: () => noise,
		fuelCellParamBounds: () => paramBounds,
		actualFuelCellParams: () => actualFcParams,
		maxCurrent: () => maxCurrent,
		targetCost: () => targetCost,
		maxEvals: () => maxEvals,
		evalFrac: () => evalFrac,
		alpha: () => alpha,
		mRate: () => mRate,
		populationSize: () => pSize
	}
};

export const fuelCellRun = (type) => (seed, fcConstants, fcMLParams, quit, then) => {
	const prg = new PRG(seed);
	const fcCalc = fuelCellV(fcConstants);
	const actual = actualStack(prg, fcCalc,
		fcMLParams.noise(), 
		fcMLParams.actualFuelCellParams(),
		fcMLParams.maxCurrent());

	const builder = fuelCellIndividualBuilder(prg, fcConstants, fcMLParams, actual, fcCalc);
	const population = Range(0, fcMLParams.populationSize()).map(i => {
		const dna = fcMLParams.fuelCellParamBounds().map(bound => randomChr(prg, bound));
		return builder(dna)
	})

	const finish = (res, status) => 
		then(res.merge(Immutable.Map({actualStack: actual})), status)

	switch (type) {
		case 'JPS':
			JPS(prg, population, fcMLParams.targetCost(), 
				fcMLParams.alpha(), fcMLParams.maxEvals(), 
				fcMLParams.evalFrac(), fcMLParams.mRate(),  
				quit, finish)
			break;
		case 'GA':
			GA(prg, population, fcMLParams.genCount(), 
				fcMLParams.birthRate(), fcMLParams.mRate(), 
				quit, finish)
			break;
	}
};
