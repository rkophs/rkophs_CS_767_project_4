/*
* @Author: ryan
* @Date:   2016-11-29 21:09:33
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-08 17:59:22
*/

'use strict';

import React, { PropTypes } from 'react'
import Dimensions from 'react-dimensions'
import {FormControl, Col, Row, Grid} from 'react-bootstrap';
import Plot from './Plot'
import Immutable from 'immutable'
import LinePlot from '../../utilities/LinePlot'
import * as d3 from 'd3'

class Graph extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			i: 0
		}
		this.reset(-1)
	}

	componentWillUnmount() {
		this.reset(-1)
	}

	restart() {
		if (this.props.run.get("status") == "SUCCESS"
			&& !this.props.run.get("loading")) {
			this.getPaths()
			this.iMax = this.props.run.get("lines").length
			let i = 1;
			this.timerID = setInterval(() => this.tick(i++, this.runId), this.speed)
		}
	}

	tick(i, runId) {
		this
		if (i >= this.iMax || this.runId != runId) {
			this.reset(runId)
			return
		}
		this.setState({i})
	}

	reset(runId) {
		this.runId = runId;
		this.speed = this.props.ui.get("speed");
		if (this.timerID != undefined) {
			clearInterval(this.timerID);
		}
	}

	getPaths() {

		const lines = this.props.run.get("lines")
		this.xBounds = this.props.run.get("xBounds")
		this.yBounds = this.props.run.get("yBounds")
		const actual = this.props.run.get("actualStack")
		const approx = this.props.run.get("approx")
		this.solution = this.props.run.get("solution")
		this.title = this.props.run.get("type") == 'GA' ?
			"Genetic Algorithm Run" : "JPS Algorithm Run"

		this.margin = {top: 20, right: 80, bottom: 30, left: 50};
		this.width = this.props.containerWidth - this.margin.left - this.margin.right;
		this.height = 500 - this.margin.top - this.margin.bottom;
		this.transform = `translate(${this.margin.left},${this.margin.top})`
		this.labels = [
			{text:"Actual Stack", y:25, className:"label_actual"},
			{text:"Approximation", y:50, className:"label_approx"},
			{text:"Generation", y:75, className:"label_generation"}]

		const x = d3.scaleLinear()
			.domain([this.xBounds[0], this.xBounds[1]*1.1])
			.rangeRound([0, this.width]);

		const y = d3.scaleLinear()
			.domain([this.yBounds[0] - 1, this.yBounds[1]*1.1])
			.range([this.height, 0]);

		this.yAxis = d3.axisLeft()
			.scale(y)
			.ticks(10)

		this.xAxis = d3.axisBottom()
			.scale(x)
			.ticks(Math.floor(this.xBounds[1]));

		const line = d3.line()
			.x(d => x(d[0] + 1))
        	.y(d => y(d[1]))

		this.paths = lines.map((l, j) => {
			return (<path key={`line_${j}`} d={line(l)} className="line shadow" />)
		})

		this.actual = (<path key="line_actual" className="line_actual shadow" d={line(actual)} />)
		this.approx = (<path key="line_approx" className="line_approx shadow" d={line(approx)} />)
	}

	handleSpeedChange = (e) => {
		this.props.onSpeedChange(e.target.value);
	}

	render() {
		const runId = this.props.ui.get("visibleRun")
		const speed = this.props.ui.get("speed")
		if (this.props.run.get("loading")) {
			this.reset(-1)
			return null;
		}

		if (runId != this.runId || speed != this.speed) {
			this.reset(runId)
			this.state.i = 0
			this.restart()
		}

		const i = this.state.i

		return (
			<Grid fluid={true} >
				<Row className="show-grid">
					<h4>{this.title}</h4>
				</Row>
				<Row className="show-grid">
					<Col sm={2}>
						<h6>Generation {i} of {this.iMax - 1}</h6>
					</Col>
					<Col sm={3}>
						<h6>Best Sum of Error Squared: {(this.solution.cost()).toFixed(7)}</h6>
					</Col>
					<Col sm={2}>
						<h6>Time per animation frame, (ms):</h6>
					</Col>
					<Col sm={1}>
						<FormControl
							defaultValue={this.props.ui.get("speed")}
							onChange={this.handleSpeedChange}
						/>
					</Col>
				</Row>
				<Row className="show-grid">
					<Plot
						lines={this.paths.slice(0, i)}
						actual={this.actual}
						approx={this.approx}
						yBounds={this.yBounds}
						xBounds={this.xBounds}
						margin={this.margin}
						xAxis={this.xAxis}
						yAxis={this.yAxis}
						height={this.height}
						labels={this.labels}
					/>
				</Row>
			</Grid>
		)
	}
}

export default Dimensions()(Graph)
