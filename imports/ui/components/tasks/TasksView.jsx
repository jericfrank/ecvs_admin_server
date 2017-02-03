import React, { PropTypes } from "react";
import { FormattedTime, FormattedDate } from 'react-intl';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { clientStatusHelper , statusClassHelper } from '../../utils/helpers.js';
import { Tasks } from '../../../api/tasks.js';
import CommentsWrapper from '../comments/CommentsWrapper.jsx';
import TasksSorting from "./TasksSorting.jsx";
import TasksQoutation from "./TasksQoutation.jsx";
import TasksJobOrder from "./TasksJobOrder.jsx";

class TasksView extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}


	handleMark(){
		const { tasks } = this.props;


		Meteor.call('tasks.markAsDone', tasks._id , !tasks.done , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{
				Bert.alert( "mark as done!", 'success', 'growl-top-right' );
			}
		});
	}

	render() {
		const { tasks, listLoading } = this.props;

		if(listLoading){
			return <p>loading ...</p>
		}

		const tr = tasks.Validation.Files.map( (file)=>{

			return <tr key={file._id}>
				<td>
					<a href={file.url()}>{file.original.name}</a>
				</td>
				<td>{file.description}</td>
				<td><FormattedDate value={file.uploadedAt}/>, <FormattedTime value={file.uploadedAt}/></td>
			</tr>
		});

 		return	<div>
 			<button onClick={browserHistory.goBack}>Back</button>



 			<div className="row">
 				<div className="col-md-4">
 					<ul>
				        <li>ID: { tasks.Validation._id }</li>
				        <li>Status: <label className={statusClassHelper(tasks.Validation.status)}>{ clientStatusHelper(tasks.Validation.status) }</label></li>
				        <li>Date Added: <FormattedDate value={tasks.Validation.createdAt}/>, <FormattedTime value={tasks.Validation.createdAt}/></li>
				        <li>Remarks: { tasks.Validation.remarks }</li>
				      </ul>
 				</div>
 				<div className="col-md-8">
 					<table className="table table-striped table-bordered">
		 				<thead>
		 					<tr>
		 						<th>Filename</th>
		 						<th>Description</th>
		 						<th>Date Added</th>
		 					</tr>
		 				</thead>
		 				<tbody>
		 					{tr}
		 				</tbody>
		 			</table>
 				</div>

 				<div className="col-md-8">
 					<CommentsWrapper currentUser={this.props.currentUser} validation={tasks.Validation} />
 				</div>
 				<div className="col-md-8">
 					
 					
 					{(() => {
				        switch (tasks.status) {
				            case 0:
				                return <TasksSorting currentUser={this.props.currentUser} validation={tasks.Validation}/>
				            case 1:
				            	return <TasksQoutation currentUser={this.props.currentUser} validation={tasks.Validation}/>
				            case 4:
				                return <TasksJobOrder currentUser={this.props.currentUser} validation={tasks.Validation}/>
				            default :
				                null
				        }
				    })()}

 				</div>

 				{
 					(tasks.status == tasks.Validation.status) ? 
 					<button onClick={this.handleMark.bind(this)} type="button" className={ (tasks.done) ? 'btn btn-danger' : 'btn btn-primary' }>
						{ (tasks.done) ? 'undo' : 'Mark as DONE' }
					</button> : ''
 				}
				
 				
 			</div>

	  	</div>
	}
}

TasksView.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

    var handle = Meteor.subscribe("tasks.owner");

  return {
    listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    tasks: Tasks.findOne(params._id)
  };
}, TasksView);