import React from "react";

import Nav from './components/layouts/Nav.jsx';

export default class App extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {

 		return	<div className="container">
 			<Nav />
 			{ this.props.children }
	  	</div>
	}
}