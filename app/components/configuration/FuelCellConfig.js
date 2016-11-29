/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 11:15:51
*/

'use strict';

import React, { PropTypes } from 'react'
import { Form, Button } from 'react-bootstrap'
import Bounds from './Bounds'
import Constant from './Constant'
import AlgorithmConfig from './AlgorithmConfig'

const FuelCellConfig = ({bounds, constants, gaParams,
		onSubmitGA, onBoundsChange, onConstantsChange, onGaChange}) => (

	<Form horizontal>
		<h4>Fuel Cell Parametric Bounds:</h4>
		{	
			bounds.valueSeq().map(bound => 
			<Bounds key={bound.get("id")} 
					bound={bound} 
					onChange={onBoundsChange} />
		)}
		<h4>Fuel Cell Constants:</h4>
		{constants.valueSeq().map(constant =>
			<Constant key={constant.get("id")} 
					constant={constant}
					onChange={onConstantsChange} />
		)}
		<h4>Genetic Algorithm Parameters:</h4>
		{gaParams.valueSeq().map(param =>
			<AlgorithmConfig key={param.get("id")} 
					param={param}
					onChange={onGaChange} />
		)}
		<Button onClick={() => onSubmitGA(bounds, constants, gaParams)} >Run GA</Button>
	</Form>
)

export default FuelCellConfig