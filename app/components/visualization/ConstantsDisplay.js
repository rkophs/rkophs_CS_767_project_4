/*
* @Author: ryan
* @Date:   2016-12-01 14:39:05
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 14:50:53
*/

'use strict';

import React, { PropTypes } from 'react'

const ConstantsDisplay = ({constants}) => {
	return (
		<div>
			<h4>Fuel Cell Constants</h4>
			{constants.valueSeq().map(constant => {
				return (<h6 key={`display_${constant.get("id")}`} >
					<code>{constant.get("html")}</code>
					&nbsp;{constant.get("description")}:&nbsp;
					<code>{constant.get("value").toFixed(7)}</code>
				</h6>)
			})}
		</div>)
}

export default ConstantsDisplay