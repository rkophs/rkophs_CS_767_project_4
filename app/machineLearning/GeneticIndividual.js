/*
* @Author: ryan
* @Date:   2016-11-23 15:53:00
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 11:17:45
*/

'use strict';

import Immutable from 'immutable'

const GeneticIndividual = (crossover, mutate, fitness, solution) => (dna) => {
	
	let fit = () => {
		const level = fitness(dna)
		fit = () => level
		return fit()
	}

	let soln = () => {
		const result = solution(dna)
		soln = () => result
		return soln()
	}

	const builder = GeneticIndividual(crossover, mutate, fitness, solution)

	return {
		crossover: (prg, count, i) => {
			return Immutable.List(crossover(prg, count, dna, i.dna()))
				.map(dna => builder(dna));
		},
		mutate: (prg, rate) => builder(mutate(prg, rate, dna)),
		fitness: () => fit(),
		dna: () => dna,
		solution: () => soln(),
		toJSON: () => { dna }
	}
}

export default GeneticIndividual