import React from "react";
import { createContainer } from 'meteor/react-meteor-data';

import { Evidence } from '../../../api/evidence.js';

class TasksJobOrderSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attaches , evidence } = this.props;

		const li = evidence.map( (evidences)=>{
			return <li key={evidences._id}>
				<a href={evidences.url()}>{evidences.original.name}</a>
			</li>
		});

		if(!attaches.Workers){
			return <tr>
				<td colSpan="5">loading ... </td>
			</tr>
		}

 		return	<tr>
 			<td>{attaches._id}</td>
 			<td>{attaches.Workers.lastName}, {attaches.Workers.firstName}</td>
 			<td>
 				<a href={attaches.Certificates.url()}>{attaches.Certificates.original.name}</a>
 			</td>
 			<td>{(attaches.active) ? 'Yes' : 'No'}</td>
 			<td>
 				{li}
 			</td>
	  	</tr>
	}
}

export default createContainer((props) => {
	const { attaches } = props;

	var handle = Meteor.subscribe("evidence.all");
	let _id = null;

	if(attaches.Certificates){
		_id = attaches.Certificates._id
	}
  
  return {
  	listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    evidence: Evidence.find({ certificatesId: _id }).fetch()
  };
}, TasksJobOrderSingle);