import React, { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import { Workers } from '../../../api/workers.js';
import WorkersForm from "./WorkersForm.jsx";
import WorkersSingle from "./WorkersSingle.jsx";

class WorkersWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { workers } = this.props;
		const tr = workers.map( (worker)=>{

			return <WorkersSingle  key={worker._id} worker={worker}/>
		});

 		return	<div className="row">
 			<div className="col-xs-4">
 				<WorkersForm />
 			</div>
 			<div className="col-xs-8">
 				<label>WorkersWrapper</label>
	 			<table className="table table-striped table-bordered">
	 				<thead>
	 					<tr>
	 						<th>ID</th>
	 						<th>Name</th>
	 						<th>Gender</th>
	 						<th>Birthdate</th>
	 						<th>Remarks</th>
	 						<th></th>
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


WorkersWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
    var handle = Meteor.subscribe("workers.all");

  return {
    listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    workers: Workers.find().fetch()
  };
}, WorkersWrapper);