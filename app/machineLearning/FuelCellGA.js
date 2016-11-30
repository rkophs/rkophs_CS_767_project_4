/*
* @Author: ryan
* @Date:   2016-11-23 16:19:53
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 20:35:24
*/

'use strict';

import Immutable from 'immutable'
import GA from './GeneticAlgorithm'
import fuelCellBuilder from './FuelCell'
import GeneticIndividual from './GeneticIndividual'
import PRG from '../utilities/PRG'

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
	return Immutable.List(Array(maxCurrent)).map((v, i) => {
		return voltage(i + 1, params, fuelCellV);
	});
};

const randomChr = (prg, b) => {
	return prg.random() * (b.get(1) - b.get(0)) + b.get(0);
};

const fuelCellIndividualBuilder = (prg, fuelCellConstants, fuelCellGAParams) => {

	const fuelCellCalc = fuelCellV(fuelCellConstants);

	const target = actualStack(prg, fuelCellCalc,
		fuelCellGAParams.noise(), 
		fuelCellGAParams.actualFuelCellParams(),
		fuelCellGAParams.maxCurrent());

	const crossover = (prg, count, dna1, dna2) => {
		return Immutable.List(Array(count)).map(i => {
			return dna1.map((c1, k) => {
				return prg.random() <= 0.5 ? c1 : dna2.get(k);
			}); 
		})
	};

	const mutate = (prg, rate, dna) => {
		return dna.map((chr, i) => {
			if (prg.random() > rate) {
				return chr;
			}
			return randomChr(prg, fuelCellGAParams.fuelCellParamBounds().get(i));
		});
	};

	const solution = (params) => {
		return Immutable.List(Array(fuelCellGAParams.maxCurrent())).map((_, i) => {
				return voltage(i+1, params, fuelCellCalc);
			});
	}

	const fitness = (params) => {
		const sse = solution(params).reduce((a, c, i) => {
			const err = target.get(i) - c;
			return a + (err * err);
		}, 0);
		return 1/sse;
	};

	return GeneticIndividual(crossover, mutate, fitness, solution);
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

export const fuelCellGAParams = (noise, paramBounds, targetParams, 
	maxCurrent, genCount, birthRate, mRate, pSize) => {
	return {
		noise: () => noise,
		fuelCellParamBounds: () => paramBounds,
		actualFuelCellParams: () => targetParams,
		maxCurrent: () => maxCurrent,
		genCount: () => genCount,
		birthRate: () => birthRate,
		mRate: () => mRate,
		populationSize: () => pSize
	}
};

export const fuelCellGARun = (seed, fuelCellConstants, fuelCellGAParams, quit, then) => {
	const prg = new PRG(seed);
	const builder = fuelCellIndividualBuilder(prg, fuelCellConstants, fuelCellGAParams);
	const population = Immutable.List(Array(fuelCellGAParams.populationSize()))
		.map(i => {
			const dna = fuelCellGAParams.fuelCellParamBounds().map(bound => {
				return randomChr(prg, bound); 
			});
			return builder(dna);
		});

	GA(prg, population, fuelCellGAParams.genCount(), 
		fuelCellGAParams.birthRate(), 
		fuelCellGAParams.mRate(), quit, then)
};
