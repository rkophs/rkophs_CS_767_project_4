/*
* @Author: ryan
* @Date:   2016-11-29 21:50:35
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 09:59:18
*/

'use strict';

import * as d3 from 'd3'

const LinePlot = () => {

	const type = (d, _, columns) => {
		d.date = parseTime(d.date);
		for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
		return d;
	}

	const svg = d3.select("#chart_svg"),
	margin = {top: 20, right: 80, bottom: 30, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const x = d3.scaleLinear().range([0, width]),
			y = d3.scaleLinear().range([height, 0]),
			z = d3.scaleOrdinal(d3.schemeCategory10);

	const line = d3.line()
			.curve(d3.curveBasis)
			.x((d) => x(d.date))
			.y((d) => y(d.temperature));

	const cities = [{
		id: "New York",
		values: [{
			date: 20111001,
			temperature: 63
		},{
			date: 20111002,
			temperature: 65
		},{
			date: 20111003,
			temperature: 66
		}]
	},{
		id: "Austin",
		values: [{
			date: 20111001,
			temperature: 93
		},{
			date: 20111002,
			temperature: 95
		},{
			date: 20111003,
			temperature: 96
		}]
	}]

	x.domain([20111001, 20111003]);

	y.domain([
		d3.min(cities, (c) => d3.min(c.values, (d) => d.temperature )),
		d3.max(cities, (c) => d3.max(c.values, (d) => d.temperature ))
	]);

	z.domain(cities.map((c) => c.id));

	g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.append("text")
				.attr("x", 50)
				.attr("dx", "0.71em")
				.attr("fill", "#000")
				.text("Current (Amps)");

	g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y))
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 10)
				.attr("dy", "0.71em")
				.attr("fill", "#000")
				.text("Potential (V)");

	const city = g.selectAll(".city")
		.data(cities)
		.enter().append("g")
			.attr("class", "city");

	city.append("path")
			.attr("class", "line")
			.attr("d", (d) => line(d.values))
			.style("stroke", (d) => z(d.id));

	city.append("text")
			.datum((d) => ({id: d.id, value: d.values[d.values.length - 1]}))
			.attr("transform", (d) => 
				("translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"))
			.attr("x", 3)
			.attr("dy", "0.35em")
			.style("font", "10px sans-serif")
			.text((d) => d.id);
}

export default LinePlot

