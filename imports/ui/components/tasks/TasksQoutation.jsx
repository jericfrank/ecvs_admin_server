import React ,  { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';

import TasksQoutationSingle from './TasksQoutationSingle.jsx';
import { Attach } from '../../../api/attachCertificate.js';

class TasksQoutation extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attach } = this.props;

		const tr = attach.map( (attaches)=>{

			if(!attaches.Certificates.url()){
				return <tr key={attaches._id}>
					<td colSpan="1">loading.. .</td>
				</tr>
			}

			return <TasksQoutationSingle key={attaches._id} attaches={attaches}/>
		});

 		return	<div>
 			For Qoutation

 			<table className="table table-striped table-bordered">
		        <thead>
		          <tr>
					<th>Certificate</th>
					<th>Date Sorted</th>
					<th>Remarks</th>
					<th>Cost</th>
					<th></th>
		          </tr>
		        </thead>
		        <tbody>
		        	{tr}
		        </tbody>
		      </table>

	  	</div>
	}
}

export default createContainer((props) => {
	const { validation } = props;

    var handle = Meteor.subscribe("attach.all");

  return {
    listLoading: !handle.ready(),
    attach: Attach.find({validationId: validation._id}).fetch()
  };
}, TasksQoutation);