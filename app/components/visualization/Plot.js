/*
* @Author: ryan
* @Date:   2016-11-29 21:46:42
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 11:13:52
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
		return (
			<g className="axis axis--y" 
					transform={ this.props.axisType == 'x' ? translate : "" } >
				<text transform= { this.props.axisType == 'x' ? "" : "rotate(-90)" }
						y={10} dy="0.71em" fill="#000" >
					{this.props.text}
				</text>
			</g>)
	}
}

class Line extends React.Component {

}

const Plot = ({run, i}) => {

	const margin = {top: 20, right: 80, bottom: 30, left: 50};
	const width = 700 - margin.left - margin.right;
	const height = 500 - margin.top - margin.bottom;

	const transform = "translate(" + margin.left + "," + margin.top + ")"

	// const x = d3.scaleLinear().range([0, width]),
	// 	y = d3.scaleLinear().range([height, 0]),
	// 	z = d3.scaleOrdinal(d3.schemeCategory10);

	// const line = d3.line()
	// 	.curve(d3.curveBasis)
	// 	.x((d) => x(d.date))
	// 	.y((d) => y(d.temperature));

	// const cities = [{
	// 	id: "New York",
	// 	values: [{
	// 		date: 20111001,
	// 		temperature: 63
	// 	},{
	// 		date: 20111002,
	// 		temperature: 65
	// 	},{
	// 		date: 20111003,
	// 		temperature: 66
	// 	}]
	// },{
	// 	id: "Austin",
	// 	values: [{
	// 		date: 20111001,
	// 		temperature: 93
	// 	},{
	// 		date: 20111002,
	// 		temperature: 95
	// 	},{
	// 		date: 20111003,
	// 		temperature: 96
	// 	}]
	// }]

	// x.domain([20111001, 20111003]);

	// y.domain([
	// 	d3.min(cities, (c) => d3.min(c.values, (d) => d.temperature )),
	// 	d3.max(cities, (c) => d3.max(c.values, (d) => d.temperature ))
	// ]);

	// z.domain(cities.map((c) => c.id));

	// g.append("g")
	// 		.attr("class", "axis axis--x")
	// 		.attr("transform", "translate(0," + height + ")")
	// 		.call(d3.axisBottom(x))
	// 		.append("text")
	// 			.attr("x", 50)
	// 			.attr("dx", "0.71em")
	// 			.attr("fill", "#000")
	// 			.text("Current (Amps)");

	// g.append("g")
	// 		.attr("class", "axis axis--y")
	// 		.call(d3.axisLeft(y))
	// 		.append("text")
	// 			.attr("transform", "rotate(-90)")
	// 			.attr("y", 10)
	// 			.attr("dy", "0.71em")
	// 			.attr("fill", "#000")
	// 			.text("Potential (V)");

	// const city = g.selectAll(".city")
	// 	.data(cities)
	// 	.enter().append("g")
	// 		.attr("class", "city");

	// city.append("path")
	// 		.attr("class", "line")
	// 		.attr("d", (d) => line(d.values))
	// 		.style("stroke", (d) => z(d.id));

	// city.append("text")
	// 		.datum((d) => ({id: d.id, value: d.values[d.values.length - 1]}))
	// 		.attr("transform", (d) => 
	// 			("translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"))
	// 		.attr("x", 3)
	// 		.attr("dy", "0.35em")
	// 		.style("font", "10px sans-serif")
	// 		.text((d) => d.id);

	const data=[
			{day:1,count:180},
			{day:2,count:250},
			{day:3,count:150},
			{day:4,count:496},
			{day:5,count:140}
		];

	const x = d3.scaleLinear()
		.domain([d3.min(data, d => d.day) - 1, d3.max(data, d => d.day) + 1])
		.rangeRound([0, width]);

	const y = d3.scaleLinear()
		.domain([0, d3.max(data, (d) => d.count) + 100])
		.range([height, 0]);
			
	const yAxis = d3.axisLeft()
		.scale(y)
		.ticks(5)


	const xAxis = d3.axisBottom()
		.scale(x)
		.tickValues(data.map((d,i) => d.day))
		.ticks(5);

	const line = d3.line()
		.x((d) => x(d.day))
        .y((d) => y(d.count))
			
	return (<div>
			<svg id={"testId"} width="100%" height="500">
				<g transform={transform}>
					<Axis h={height} axis={yAxis} axisType="y" text="Hello" />
					<Axis h={height} axis={xAxis} axisType="x" text="Hi" />

					<path className="line shadow" d={line(data)} strokeLinecap="round"/>
				</g>
			</svg>
		</div>)
}

export default Plot