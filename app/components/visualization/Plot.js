/*
* @Author: ryan
* @Date:   2016-11-29 21:46:42
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 15:06:58
*/

'use strict';

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import * as d3 from 'd3'

class Axis extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() { this.renderAxis() }
	componentDidMount() { this.renderAxis() }

	renderAxis() { 
		const node = ReactDOM.findDOMNode(this);
		d3.select(node).call(this.props.axis);
	}

	render() {
		const translate = `translate(0,${this.props.h})`;
		const y = this.props.axisType == 'x' ? 20 : -30
		const x = this.props.axisType == 'x' ? 50 : -20
		return (
			<g className="axis axis--y" 
					transform={ this.props.axisType == 'x' ? translate : "" } >
				<text transform= { this.props.axisType == 'x' ? "" : "rotate(-90)" }
						y={y} x={x} dy="0.71em" fill="#000" >
					{this.props.text}
				</text>
			</g>)
	}
}

const Plot = ({lines, actual, approx, yBounds, xBounds, margin, xAxis, yAxis, height}) => {

	const transform = "translate(" + margin.left + "," + margin.top + ")"
			
	return (<div>
			<svg id={"testId"} width="100%" height="500">
				<g transform={transform}>
					<Axis h={height} axis={yAxis} axisType="y" text="Potential (V)" />
					<Axis h={height} axis={xAxis} axisType="x" text="Current (A)" />

					{ lines }
					{ actual }
					{ approx }

				</g>
			</svg>
		</div>)
}

export default Plot
