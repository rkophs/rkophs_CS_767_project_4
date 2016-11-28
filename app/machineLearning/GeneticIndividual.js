/*
* @Author: ryan
* @Date:   2016-11-23 15:53:00
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-27 13:34:52
*/

'use strict';

import Immutable from 'immutable'

const GeneticIndividual = (crossover, mutate, fitness) => (dna) => {
	
	let fit = () => {
		const level = fitness(dna)
		fit = () => level
		return fit()
	}

	const builder = GeneticIndividual(crossover, mutate, fitness)

	return {
		crossover: (prg, count, i) => {
			return Immutable.List(crossover(prg, count, dna, i.dna()))
				.map(dna => builder(dna));
		},
		mutate: (prg, rate) => builder(mutate(prg, rate, dna)),
		fitness: () => fit(),
		dna: () => dna,
		toJSON: () => { dna }
	}
}

export default GeneticIndividual