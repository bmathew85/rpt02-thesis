import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../../Root.jsx'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import { MemoryRouter as Router, withRouter } from 'react-router-dom'

//** SHALLOW RENDERING SYNTAX */
	// shallow(<Router>
	// 		<Root />
	// 	</Router>);
it('renders withouth crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
	  <Router>
			<Root />
		</Router>, div);
});