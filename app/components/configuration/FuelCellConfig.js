/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 14:15:28
*/

'use strict';

import React, { PropTypes } from 'react'
import { Form, Button, Grid, Row, Col, Clearfix } from 'react-bootstrap'
import Bounds from './Bounds'
import Constant from './Constant'
import AlgorithmConfig from './AlgorithmConfig'

const FuelCellConfig = ({bounds, constants, gaParams,
		onSubmitGA, onBoundsChange, onConstantsChange, onGaChange}) => (

	<Form horizontal>
		<Row className="show-grid">	
			<Col xs={6} md={5}>
				<h4>Fuel Cell Optimization Bounds:</h4>
				<Col sm={3}></Col>
				<Col sm={3}><h6>Lower</h6></Col>
				<Col sm={3}><h6>Upper</h6></Col>
				<Col sm={3}><h6>Actual</h6></Col>
				{	
					bounds.valueSeq().map(bound => 
					<Bounds key={bound.get("id")} 
							bound={bound} 
							onChange={onBoundsChange} />
				)}
			</Col>
			<Col xs={6} md={4}>
				<h4>Fuel Cell Constants:</h4>
				{constants.valueSeq().map(constant =>
					<Constant key={constant.get("id")} 
							constant={constant}
							onChange={onConstantsChange} />
				)}
			</Col>
			<Col xs={6} md={3}>
				<h4>Genetic Algorithm Parameters:</h4>
				{gaParams.valueSeq().map(param =>
					<AlgorithmConfig key={param.get("id")} 
							param={param}
							onChange={onGaChange} />
				)}
			</Col>
		</Row>
		<Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
		<Button onClick={() => onSubmitGA(bounds, constants, gaParams)} >Run GA</Button>
	</Form>
)

export default FuelCellConfig