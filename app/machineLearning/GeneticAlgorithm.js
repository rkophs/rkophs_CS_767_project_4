/*
* @Author: ryan
* @Date:   2016-11-09 11:06:47
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 12:39:44
*/

'use strict';

import Immutable from 'immutable'
import PRG from '../utilities/PRG'

const chooseIndividual = (prg, population, fitnessSum) => {
	let randSelect = prg.random() * fitnessSum;
	return population.findEntry((individual) => {
		randSelect -= individual.fitness();
		return randSelect <= 0;
	}, population);
}

const getFitnessSum = population => {
	return population.reduce((a, b) => a + b.fitness(), 0);
}

const selectChildren = (prg, pop, sum, birthRate) => {
	const p1 = chooseIndividual(prg, pop, sum);
	const p2 = chooseIndividual(prg, pop.splice(p1[0], 1), sum - p1[1].fitness());
	return p1[1].crossover(prg, birthRate, p2[1]);
}

const selection = (prg, population, birthRate) => {
	const fitnessSum = getFitnessSum(population);

	let children = Immutable.List([]);
	while (children.size < population.size) {
		const selected = selectChildren(prg, population, fitnessSum, birthRate);
		children = children.concat(selected);
	}
	return children;
}

const generation = (prg, population, birthRate, mRate) => {
	return selection(prg, population, birthRate).map(ind => ind.mutate(prg, mRate));
}

const getFittest = (population) => {
	return population.reduce((a, v) => {
		return (v.fitness() > a.fitness()) ? v : a
	}, population.get(0));
}

const GA = (prg, initialPopulation, gCount, birthRate, mRate, quit, then) => {

	let pop = Immutable.List(initialPopulation);
	let g1 = Immutable.Map({population: pop, fittest: getFittest(pop)});
	let generations = [g1];

	let interval;

	const iteration = (i) => {
		pop = generation(prg, pop, birthRate, mRate);
		const fittest = getFittest(pop);
		let g = Immutable.Map({population: pop, fittest: fittest});
		generations.push(g);

		const stop = quit()
		if (i >= gCount - 1 || stop) {
			clearInterval(interval)
			then(Immutable.Map({
				solution: g.get('fittest'),
				generations: Immutable.List(generations)
			}), !stop);
		}
	}

	let i = 0
	interval = setInterval(() => iteration(i++), 0)
}

export default GA
