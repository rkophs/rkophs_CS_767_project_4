/*
* @Author: ryan
* @Date:   2016-12-04 17:53:16
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 17:06:15
*/

'use strict';

import Immutable from  'immutable'

const getFittest = (population) => {
	return population.reduce((a, v) => {
		return (v.cost() < a.cost()) ? v : a
	}, population.get(0));
}

const computeDAvg = (trials, mutants) => {
	const trialSum = trials.reduce((a, v) => {
		return a + v.cost()
	}, 0)
	const mutantSum = mutants.reduce((a, v) => {
		return a + v.cost()
	}, 0)
	return (trialSum - mutantSum) / trials.size
}

const createMutants = (population, prg, mRate) => {
	return population.map(i => i.mutate(prg, mRate))
}

const JPS = (prg, trials, targetCost, alpha, maxEvals, evalFrac, mRate, quit, then) => {

	let trialPool = Immutable.List(trials);
	let mutantPool = createMutants(trialPool, prg, mRate)
	let dAvg = computeDAvg(trialPool, mutantPool)
	let current = getFittest(trialPool)
	let best = current
	let generations = []

	let interval;

	const iteration = (evals) => {

		try {
			let next = current.mutate(prg, mRate)
			if (next.cost() < best.cost()) {
				best = next
			}
			if (next.cost() < current.cost()) {
				current = next
			} else {
				let d = next.cost() - current.cost()
				let prob = evals <= evalFrac*maxEvals ?
					Math.pow(alpha, evals) :
					Math.pow(alpha, evals)/(1 + ((d/dAvg)*(d/dAvg)))
				if (prg.random() <= prob) {
					current = next
				}
			}
			generations.push(Immutable.Map({fittest: next}))
		} catch (e) {
			console.log(e)
			clearInterval(interval)
			then(Immutable.Map({}), false);
			return
		}

		const stop = quit()
		if (evals > maxEvals - 1 || best.cost() <= targetCost || stop) {
			clearInterval(interval)
			then(Immutable.Map({
				solution: best,
				generations: Immutable.List(generations)
			}), !stop);
		}
	}	

	let evals = 0
	interval = setInterval(() => iteration(evals++), 0)
}

export default JPS