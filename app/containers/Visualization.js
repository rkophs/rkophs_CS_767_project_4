/*
* @Author: ryan
* @Date:   2016-11-28 11:36:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-01 13:25:53
*/

'use strict';

import { connect } from 'react-redux'
import { changeRunDisplay, changeSpeed } from '../actions'
import Visualization from '../components/Visualization'

const mapStateToProps = (state) => ({
	ui: state.ui,
	calculations: state.calculations
})

const mapDispatchToProps = (dispatch) => ({
	onRunChange: (id) => { dispatch(changeRunDisplay(id)) },
	onSpeedChange: (speed) => { dispatch(changeSpeed(speed)) }
})

const Visual = connect(
	mapStateToProps,
	mapDispatchToProps
)(Visualization)

export default Visual
