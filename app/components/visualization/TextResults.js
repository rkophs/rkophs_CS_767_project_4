/*
* @Author: ryan
* @Date:   2016-12-01 13:45:44
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 14:37:13
*/

'use strict';

import React, { PropTypes } from 'react'
import Loader from 'react-loader'

const TextResults = ({run}) => {

	if (run.get("loading")) {
		return <Loader loaded={false} />
	}

	const bests = run.get("bests")
	return (<div className="text_results" >
		{ bests.map((gen, i) => {
			const dna = gen.dna.map(d => d.toFixed(7))
			const fitness = gen.fitness
			const sse = `Sum of Error Squared: ${(1/fitness).toFixed(7)} `
			const soln = `{x1: ${dna[0]}, 
							x2: ${dna[1]}, 
							x3: ${dna[2]}, 
							x4: ${dna[3]},
							y: ${dna[4]},
							R(c): ${dna[5]}, 
							B: ${dna[6]}}`
			return (<h6 key={`dna_${run.get("id")}_${i}`} ><code>{sse}{soln}</code></h6>)
		})}
		</div>)
}

export default TextResults