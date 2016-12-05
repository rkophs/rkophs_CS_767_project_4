/*
* @Author: ryan
* @Date:   2016-11-28 11:36:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-12-05 16:09:26
*/

'use strict';

import { connect } from 'react-redux'
import { executeRun,
			updateBoundsConfig,
			updateConstantsConfig,
			updateGAParam,
			updateJPSParam } from '../actions'
import FuelCellConfig from '../components/configuration/FuelCellConfig'

const mapStateToProps = (state) => ({
	bounds: state.configuration.get("bounds"),
	constants: state.configuration.get("constants"),
	gaParams: state.configuration.get("ga"),
	jpsParams: state.configuration.get("jps")
})

const mapDispatchToProps = (dispatch) => ({
	onSubmitGA: (bounds, constants, gaParams) => dispatch(
		executeRun('GA', bounds, constants, gaParams)),
	onSubmitJPS: (bounds, constants, jpsParams) => dispatch(
		executeRun('JPS', bounds, constants, jpsParams)),
	onBoundsChange: (bound, key, value) => dispatch(updateBoundsConfig(bound, key, value)),
	onConstantsChange: (constant, value) => dispatch(updateConstantsConfig(constant, value)),
	onGaChange: (param, value) => dispatch(updateGAParam(param, value)),
	onJpsChange: (param, value) => dispatch(updateJPSParam(param, value))
})

const Configuration = connect(
	mapStateToProps,
	mapDispatchToProps
)(FuelCellConfig)

export default Configuration
