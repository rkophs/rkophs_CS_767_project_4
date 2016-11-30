import React from 'react'
import Loader from 'react-loader'
import { Grid} from 'react-bootstrap';
import Configuration from '../containers/Configuration'
import Visualization from '../containers/Visualization'

const App = ({state}) => {

	return (
		<Grid fluid={true} >
			<Configuration />
			<Visualization />
		</Grid>)
}

export default App
