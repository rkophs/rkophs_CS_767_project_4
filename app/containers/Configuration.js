/*
* @Author: ryan
* @Date:   2016-11-28 11:36:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 11:15:34
*/

'use strict';

import { connect } from 'react-redux'
import { runGA,
			updateBoundsConfig,
			updateConstantsConfig,
			updateGAParam } from '../actions'
import FuelCellConfig from '../components/configuration/FuelCellConfig'

const mapStateToProps = (state) => ({
	bounds: state.configuration.get("bounds"),
	constants: state.configuration.get("constants"),
	gaParams: state.configuration.get("ga")
})

const mapDispatchToProps = (dispatch) => ({
	onSubmitGA: (bounds, constants, gaParams) => dispatch(runGA(bounds, constants, gaParams)),
	onBoundsChange: (bound, key, value) => dispatch(updateBoundsConfig(bound, key, value)),
	onConstantsChange: (constant, value) => dispatch(updateConstantsConfig(constant, value)),
	onGaChange: (param, value) => dispatch(updateGAParam(param, value))
})

const Configuration = connect(
	mapStateToProps,
	mapDispatchToProps
)(FuelCellConfig)

export default Configuration
