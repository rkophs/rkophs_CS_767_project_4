/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-28 17:03:09
*/

'use strict';

import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Col, Code } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

const Bounds = ({bound, onChange}) => {

	const handleLowerChange = (e) => {
		onChange(bound, "lower", e.target.value);
	}

	const handleUpperChange = (e) => {
		onChange(bound, "upper", e.target.value);
	}

	return (<FormGroup controlId={"formHorizontal_bounds_" + bound.get("id")}>
		<Col componentClass={ControlLabel} sm={6}><code>{bound.get("html")}</code> {bound.get("description")}</Col>
		<Col sm={3}>
			<FormControl defaultValue={bound.get("lower")} 
						onChange={handleLowerChange} />
		</Col>
		<Col sm={3}>
			<FormControl defaultValue={bound.get("upper")}
						onChange={handleUpperChange} />
		</Col>
	</FormGroup>)
}

export default Bounds