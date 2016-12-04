/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 11:13:28
*/

'use strict';

import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap';

const Sidebar = ({ui, count, onRunChange}) => {

	const visible = ui.get('visibleRun');

	const buttons = []
	for (let i = 0; i < count; i++) {
		buttons.push(
			<Button
				key={`sidebar_${i}`}
				onClick={() => onRunChange(i)}
				active={i == visible}
				className='results-items'
			>
				{`Run: ${i + 1}`}
			</Button>
		)
	}

	return (
		<div>
			<h4 className='results-label'>Run History</h4>
			<div> {buttons} </div>
		</div>
	)
}

export default Sidebar
