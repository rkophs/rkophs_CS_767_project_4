/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 00:12:48
*/

'use strict';

import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap';

const Sidebar = ({ui, calculations, onRunChange}) => {

	const visible = ui.get('visibleRun');

	return (
		<div>
			<h4>Run History</h4>
			{ calculations.map(run => 
				(<Button key={run.get("id")} onClick={() => onRunChange(run)}
				active={run.get("id") == visible}>{`Run: ${run.get("id") + 1}`}</Button>)
			)}
		</div>
	)
}

export default Sidebar