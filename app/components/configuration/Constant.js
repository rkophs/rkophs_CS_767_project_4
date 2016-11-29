/*
* @Author: ryan
* @Date:   2016-11-28 11:55:50
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-28 18:55:57
*/

'use strict';

import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Col, Code } from 'react-bootstrap';

const Constant = ({constant, onChange}) => {

	const handleChange = (e) => {
		onChange(constant, e.target.value);
	}

	return (<FormGroup controlId={"formHorizontal_constants_" + constant.get("id")}>
		<Col componentClass={ControlLabel} sm={9}><code>{constant.get("html")}</code> {constant.get("description")}</Col>
		<Col sm={3}><FormControl defaultValue={constant.get("value")} 
								onChange={handleChange} /></Col>
	</FormGroup>)
}

export default Constant