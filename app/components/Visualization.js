/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 02:34:24
*/

'use strict';

import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Sidebar from './visualization/Sidebar'
import Graph from './visualization/Graph'

const Visualization = ({ui, calculations, onRunChange}) => {

	const visibleRun = ui.get("visibleRun");

	return (
		<Row className="show-grid">
			<Col sm={1} >
				<Sidebar ui={ui}
					calculations={calculations}	
					onRunChange={onRunChange} />
			</Col>
			<Col sm={11} >
				{ visibleRun < 0 ? 
					(<div></div>) : 
					(<Graph run={calculations.get(visibleRun)} ui={ui} />)}
			</Col>
		</Row>
	)	
}

export default Visualization