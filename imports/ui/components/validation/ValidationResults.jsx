import React from "react";
import { createContainer } from 'meteor/react-meteor-data';

import ValidationResultsSingle from "./ValidationResultsSingle.jsx";
import { Attach } from '../../../api/attachCertificate.js';

class ValidationResults extends React.Component {
	constructor() {
	    super();
	}
	
	componentDidMount() {
	}

	render() {
		const { attach } = this.props;

		const tr = attach.map( (attaches)=>{


			return <ValidationResultsSingle key={attaches._id} attaches={attaches}/>
		});

 		return	<div className="panel panel-default">
					  <div className="panel-heading">Results</div>
					  <div className="panel-body">
					  	<table className="table table-striped table-bordered">
			 				<thead>
			 					<tr>
			 						<th colSpan="3">Sorting</th>
			 						<th colSpan="2">Qoation</th>
			 						<th colSpan="2">Paid</th>
			 					</tr>
			 					<tr>
			 						<th>Worker</th>
			 						<th>Certificate</th>
			 						<th>Date Sorted</th>
			 						<th>Remarks</th>
			 						<th>Cost</th>
			 						<th>Active</th>
			 						<th>Evidence</th>
			 					</tr>
			 				</thead>
			 				<tbody>
			 					{tr}
			 				</tbody>
			 			</table>
					  </div>
				</div>
	}
}

export default createContainer((props) => {
	const { validation } = props;

	var handle = Meteor.subscribe("attach.all");
	
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    attach: Attach.find({validationId: validation._id}).fetch()
  };
}, ValidationResults);