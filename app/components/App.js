import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import Configuration from '../containers/Configuration'

const App = () => (
  <div>
	<Grid>
		<Row className="show-grid">
			<Col xs={6} md={5}><Configuration /></Col>
			<Col xs={10} md={7}>Hello</Col>
		</Row>
	</Grid>
  </div>
)

export default App
