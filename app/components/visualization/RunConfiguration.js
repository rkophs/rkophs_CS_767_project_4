/*
* @Author: ryan
* @Date:   2016-12-01 13:45:44
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 14:49:08
*/

'use strict';

import React, { PropTypes } from 'react'
import AlgorithmConfigDisplay from './AlgorithmConfigDisplay'
import BoundsDisplay from './BoundsDisplay'
import ConstantsDisplay from './ConstantsDisplay'

const RunConfiguration = ({run}) => {

	if (run.get("loading")) return null;

	const gaParams = run.get("gaParams")
	const bounds = run.get("bounds")
	const constants = run.get("constants")

	return (
		<div className="run_configuration" >
			<AlgorithmConfigDisplay params={gaParams} />
			<BoundsDisplay  bounds={bounds} />
			<ConstantsDisplay constants={constants} />
		</div>
	)
}

export default RunConfiguration
