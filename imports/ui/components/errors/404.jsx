import React from "react"
import { browserHistory } from "react-router"

export default class Error404 extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {

 		return	<div>
 			Error404

 			<a href="#" onClick={browserHistory.goBack}>Go Back</a>
	  	</div>
	}
}