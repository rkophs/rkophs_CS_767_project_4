/*
* @Author: ryan
* @Date:   2016-11-28 12:41:13
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-04 17:27:11
*/

'use strict';

import React, { PropTypes } from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import Sidebar from './visualization/Sidebar'
import Graph from './visualization/Graph'
import TextResults from './visualization/TextResults'
import RunConfiguration from './visualization/RunConfiguration'
import Loader from 'react-loader'
import '../style/modules/visualization.scss'

const Visualization = ({ui, calculations, onRunChange, onSpeedChange}) => {

	const visibleRun = ui.get("visibleRun");

	if (calculations.size == 0) {
		return null;
	}
	
	return (
		<Panel
			header={`Results: ${calculations.size}`}
			className='results-panel'
		>
			<Row className='show-grid is-flex'>
				<Col sm={1} className='results-list'>
					<Sidebar ui={ui}
						count={calculations.size}
						onRunChange={onRunChange} />
				</Col>
				<Col sm={11} >
					{ visibleRun < 0 ?
						(<div></div>) :
						(<div>
							{calculations.get(visibleRun).get('loading') ?
								(<Loader loaded={false} />) :
								(<div>
									<Row className='show-grid results-graph'>
										<Col sm={12}>
											<Graph run={calculations.get(visibleRun)} ui={ui}
											onSpeedChange={onSpeedChange} />
										</Col>
									</Row>
									<Row className='show-grid results-data'>
										<Col sm={6}>
											<TextResults run={calculations.get(visibleRun)} />
										</Col>
										<Col sm={6}>
											<RunConfiguration run={calculations.get(visibleRun)} />
										</Col>
									</Row>
								</div>)
							}
						</div>)
					}
				</Col>
			</Row>
		</Panel>
	)
}

export default Visualization
