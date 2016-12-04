import React from 'react'
import Loader from 'react-loader'
import { Grid} from 'react-bootstrap';
import Configuration from '../containers/Configuration'
import Visualization from '../containers/Visualization'

const App = ({state}) => {

	return (
		<Grid fluid={true} >
			<h2>BU MET CS 767 Machine Learning Final Project</h2>
			<Configuration />
			<Visualization />
		</Grid>
	)
}

export default App
