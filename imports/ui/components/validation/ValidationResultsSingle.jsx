import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';
import { createContainer } from 'meteor/react-meteor-data';

import { Evidence } from '../../../api/evidence.js';

class ValidationResultsSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attaches , evidence } = this.props;

		if(!attaches.Workers){
			return <tr key={attaches._id}>
				<td colSpan="7">loading.. .</td>
			</tr>
		}

		const li = evidence.map( (evidences)=>{
			return <li key={evidences._id}>
				<a href={evidences.url()}>{evidences.original.name}</a>
			</li>
		});

 		return <tr>
			<td>{attaches.Workers.lastName}, {attaches.Workers.firstName}</td>
			<td>
				<a href={attaches.Certificates.url()}>
					{attaches.Certificates.original.name}
				</a>
			</td>
			<td><FormattedDate value={attaches.createdAt}/>, <FormattedTime value={attaches.createdAt}/></td>
			<td>{attaches.remarks}</td>
			<td>{attaches.cost}</td>
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
}, ValidationResultsSingle);