/*
* @Author: ryan
* @Date:   2016-12-01 14:39:05
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 14:50:44
*/

'use strict';

import React, { PropTypes } from 'react'

const BoundsDisplay = ({bounds}) => {
	return (
		<div>
			<h4>Fuel Cell Optimization Bounds</h4>
			{bounds.valueSeq().map(bound => {
				return (<h6 key={`display_${bound.get("id")}`} >
					<code>{bound.get("html")}</code> 
					{bound.get("description")}&nbsp;(Lower, Upper, Actual):&nbsp; 
					(<code>{bound.get("lower").toFixed(7)}</code>,
					<code>{bound.get("upper").toFixed(7)}</code>,
					<code>{bound.get("actual").toFixed(7)}</code>)
				</h6>)
			})}
		</div>)
}

export default BoundsDisplay