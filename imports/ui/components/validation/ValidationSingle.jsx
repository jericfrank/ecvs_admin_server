import React from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { FormattedTime, FormattedDate } from 'react-intl';
import { Link } from 'react-router';

import { Tasks } from '../../../api/tasks.js';
import { statusHelper , statusClassHelper } from '../../utils/helpers.js';

class ValidationSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { data , tasks } = this.props;

		if(!data.User){
			return <tr>
				<td colSpan="7">loading .. .</td>
			</tr>
		}
		const li = data.Files.map( (file)=>{

			return <li key={file._id}>
				<a title={file.description} href={file.url()}>{file.original.name}</a>
			</li>
		});
		
		const tasksLi = tasks.map( (task)=>{

			return <li key={task._id}>{task.User.profile.name} { (task.done) ? <span className="label label-success">Im done!</span> : '' }</li>
		});

 		return	<tr>
 			<td>{data._id}</td>
 			<td>{data.User.profile.name}</td>
 			<td>
 				<label className={statusClassHelper(data.status)}>{statusHelper(data.status)}</label>
 			</td>
 			<td><FormattedDate value={data.createdAt}/>, <FormattedTime value={data.createdAt}/></td>
 			<td>{data.remarks}</td>
 			<td>
 				{li}
 			</td>
 			<td>
 				{ tasksLi }
 			</td>
 			<td>
 				<Link to={`/validation/${data._id}`} className="btn btn-default">view</Link>
 			</td>
 		</tr>
	}
}

export default createContainer((props) => {
	const { data } = props;

	var handle = Meteor.subscribe("tasks.selected", data._id );

  return {
    listLoading: !handle.ready(),
    tasks: Tasks.find({validationId: data._id, status: data.status}).fetch()
  };
}, ValidationSingle);