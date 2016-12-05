/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 17:13:56
*/

'use strict';

import React, { PropTypes } from 'react'
import { Form, Button, Grid, Row, Col, Clearfix, 
	Tabs, Tab, Accordion, Panel, ButtonToolbar } from 'react-bootstrap'
import Bounds from './Bounds'
import Constant from './Constant'
import AlgorithmConfig from './AlgorithmConfig'

import '../../style/modules/config.scss'

const FuelCellConfig = ({bounds, constants, gaParams, jpsParams,
		onSubmitGA, onSubmitJPS, onBoundsChange, onConstantsChange, 
		onGaChange, onJpsChange}) => (

	<div>
		<Accordion>
			<Panel
				className='settings'
				header='Settings'
				eventKey={1}
			>
				<Form horizontal>
					<Tabs
						defaultActiveKey={1}
						id='settings tabs'
					>
						<Tab
							eventKey={1}
							title='Optimization Bounds'
						>
				 			<h4>Fuel Cell Optimization Bounds:</h4>
				 			<Row>
					 			<Col smOffset={2} sm={2}><h6>Lower</h6></Col>
					 			<Col sm={2}><h6>Upper</h6></Col>
					 			<Col sm={2}><h6>Actual</h6></Col>
					 		</Row>
				 			{
				 				bounds.valueSeq().map(bound =>
				 				<Bounds key={bound.get("id")}
				 						bound={bound}
				 						onChange={onBoundsChange} />
				 			)}
						</Tab>
						<Tab
							eventKey={2}
							title='Constants'
						>
				 			<h4>Fuel Cell Constants:</h4>
				 			{constants.valueSeq().map(constant =>
				 				<Constant key={constant.get("id")}
				 						constant={constant}
				 						onChange={onConstantsChange} />
				 			)}
						</Tab>
						<Tab
							eventKey={3}
							title='GA Parameters'
						>
				 			<h4>Genetic Algorithm Parameters:</h4>
				 			{gaParams.valueSeq().map(gaParams =>
				 				<AlgorithmConfig key={gaParams.get("id")}
				 						param={gaParams}
				 						onChange={onGaChange} />
				 			)}
						</Tab>
						<Tab
							eventKey={4}
							title='JPS Parameters'
						>
				 			<h4>JPS Algorithm Parameters:</h4>
				 			{jpsParams.valueSeq().map(jpsParams =>
				 				<AlgorithmConfig key={jpsParams.get("id")}
				 						param={jpsParams}
				 						onChange={onJpsChange} />
				 			)}
						</Tab>
					</Tabs>
					<Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
				</Form>
			</Panel>
		</Accordion>
		<ButtonToolbar>
			<Button bsStyle="primary" 
					onClick={() => onSubmitGA(bounds, constants, gaParams)} >Run GA</Button>
			<Button bsStyle="danger" 
					onClick={() => onSubmitJPS(bounds, constants, jpsParams)} >Run JPS</Button>
		</ButtonToolbar>
	</div>
)

export default FuelCellConfig
