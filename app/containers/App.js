/*
* @Author: ryan
* @Date:   2016-11-28 11:36:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-29 20:44:24
*/

'use strict';

import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => ({})

const Application = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export default Application
