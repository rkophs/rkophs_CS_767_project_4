/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 18:37:59
*/

'use strict';

import React, { PropTypes } from 'react'

const AlgorithmConfigDisplay = ({params}) => {
	return (
		<div>
			<h4>Algorithm Parameters</h4>
			{params.valueSeq().map(param => {
				return (<h6 key={`display_${param.get("id")}`} >
					{param.get("description")}&nbsp;
					<code>{param.get("value").toFixed(7)}</code>
				</h6>)
			})}
		</div>)
}

export default AlgorithmConfigDisplay