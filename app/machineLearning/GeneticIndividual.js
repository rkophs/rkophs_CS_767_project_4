/*
* @Author: ryan
* @Date:   2016-11-23 15:53:00
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:33:57
*/

'use strict';

import Immutable from 'immutable'

const GeneticIndividual = (crossover, mutate, fitness, cost, solution) => (dna) => {
	
	let fit = () => {
		const level = fitness(dna)
		fit = () => level
		return fit()
	}

	let _cost = () => {
		const level = cost(dna)
		_cost = () => level
		return _cost()
	}

	let soln = () => {
		const result = solution(dna)
		soln = () => result
		return soln()
	}

	const builder = GeneticIndividual(crossover, mutate, fitness, cost, solution)

	return {
		crossover: (prg, count, i) => {
			return Immutable.List(crossover(prg, count, dna, i.dna()))
				.map(dna => builder(dna));
		},
		mutate: (prg, rate) => builder(mutate(prg, rate, dna)),
		fitness: () => fit(),
		cost: ()  => _cost(),
		dna: () => dna,
		solution: () => soln(),
		toJSON: () => { dna }
	}
}

export default GeneticIndividual