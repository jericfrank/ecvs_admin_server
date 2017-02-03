import React, { PropTypes } from "react";
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Workers } from '../../../api/workers.js';

import WorkersCertificates from "./WorkersCertificates.jsx";

class WorkersView extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { worker , listLoading } = this.props;

		if(listLoading){
			return <p>loading . .</p>
		}

 		return	<div>
 		
			<button onClick={browserHistory.goBack}>Back</button>

 			<div className="row">
 				
 				<div className="col-xs-4">
					<div className="panel panel-default">
				  		<div className="panel-heading">Worker Details</div>
				  		<div className="panel-body">
				  			<ul>
								<li>ID: {worker._id}</li>
								<li>Name: {worker.lastName}, {worker.firstName}</li>
								<li>Gender: { (worker.gender == 1) ? 'Male' : 'Female' }</li>
								<li>Birthdate: {worker.birthdate}</li>
								<li>Remarks: {worker.remarks}</li>
							</ul>
				  		</div>
 					</div>
 				</div>
 				<div className="col-xs-8">
 					<WorkersCertificates {...this.props} />
					
 				</div>

 			</div>
 			

	  	</div>
	}
}

WorkersView.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

	var handle = Meteor.subscribe("workers.all");
	
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    worker: Workers.findOne(params._id)
  };
}, WorkersView);