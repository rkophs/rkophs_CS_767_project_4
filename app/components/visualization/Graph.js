/*
* @Author: ryan
* @Date:   2016-11-29 21:09:33
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 10:40:36
*/

'use strict';

import React, { PropTypes } from 'react'
import Loader from 'react-loader'
import Plot from './Plot'
import Immutable from 'immutable'

import LinePlot from '../../utilities/LinePlot'

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

			this.generations = this.props.run.get("results").get("generations")
			let i = 1;
			this.timerID = setInterval(() => this.tick(i++, this.runId), 
				this.props.ui.get("speed"))
		}
	}

	tick(i, runId) {
		if (i >= this.generations.size || this.runId != runId) {
			this.reset(runId)
			return
		}
		this.setState({i})
	}

	reset(runId) {
		this.runId = runId;
		if (this.timerID != undefined) {
			clearInterval(this.timerID);
		}
	}

	render() {
		const runId = this.props.ui.get("visibleRun")
		if (this.props.run.get("loading")) {
			this.reset(runId)
			return <Loader loaded={false} />
		}

		if (runId != this.runId) {
			this.reset(runId)
			this.state.i = 0
			this.restart()
		}

		const i = this.state.i

		return (
			<div>
				<h4>Complete</h4>
				<Plot i={i} />
			</div>)
	}
}

export default Graph