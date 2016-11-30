/*
* @Author: ryan
* @Date:   2016-11-28 11:36:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-30 02:32:18
*/

'use strict';

import { connect } from 'react-redux'
import { changeRunDisplay } from '../actions'
import Visualization from '../components/Visualization'

const mapStateToProps = (state) => ({
	ui: state.ui,
	calculations: state.calculations
})

const mapDispatchToProps = (dispatch) => ({
	onRunChange: (run) => { dispatch(changeRunDisplay(run)) },
})

const Visual = connect(
	mapStateToProps,
	mapDispatchToProps
)(Visualization)

export default Visual
