/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 09:43:37
*/

'use strict';

import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Col, Code } from 'react-bootstrap';

const AlgorithmConfig = ({param, onChange}) => {

	const handleChange = (e) => {
		onChange(param, e.target.value);
	}

	return (<FormGroup controlId={"formHorizontal_algorithm_" + param.get("id")}>
		<Col componentClass={ControlLabel} sm={9}> {param.get("description")}</Col>
		<Col sm={3}><FormControl defaultValue={param.get("value")} 
								onChange={handleChange} /></Col>
	</FormGroup>)
}

export default AlgorithmConfig