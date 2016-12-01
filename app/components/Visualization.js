/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 14:27:12
*/

'use strict';

import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Sidebar from './visualization/Sidebar'
import Graph from './visualization/Graph'
import TextResults from './visualization/TextResults'
import RunConfiguration from './visualization/RunConfiguration'

const Visualization = ({ui, calculations, onRunChange, onSpeedChange}) => {

	const visibleRun = ui.get("visibleRun");

	return (
		<Row className="show-grid">
			<Col sm={1} >
				<Sidebar ui={ui}
					count={calculations.size}	
					onRunChange={onRunChange} />
			</Col>
			<Col sm={11} >
				{ visibleRun < 0 ? 
					(<div></div>) : 
					(<div>
						<Row className="show-grid">
							<Col sm={12}>
								<Graph run={calculations.get(visibleRun)} ui={ui} 
								onSpeedChange={onSpeedChange} />
							</Col>
						</Row>
						<Row className="show-grid">
							<Col sm={6}>
								<TextResults run={calculations.get(visibleRun)} />
							</Col>
							<Col sm={6}>
								<RunConfiguration run={calculations.get(visibleRun)} />
							</Col>
						</Row>
					</div>)}
			</Col>
		</Row>
	)	
}

export default Visualization