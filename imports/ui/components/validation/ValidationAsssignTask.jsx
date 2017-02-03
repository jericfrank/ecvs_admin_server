import React, { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import { statusHelper } from '../../utils/helpers.js';
import { agentRole } from '../../utils/roleHelper.js';

import { Tasks } from '../../../api/tasks.js';

class ValidationAsssignTask extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	agentId: ''
	    }
	}
	
	componentDidMount() {
	}

	handelSelect(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e){
		e.preventDefault();
		const { validation } = this.props;
		const { agentId } = this.state;

		if(!agentId){
			return false;
		}

		const data = {
			validationId: validation._id,
			status: validation.status,
			agentId: agentId
		}

		Meteor.call('tasks.insert' , data , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{
				Bert.alert( "added!", 'success', 'growl-top-right' );
			}
		})
	}

	handleRemove(data){

		swal({
		  title: "Are you sure?",
		  text: "You will not be able to recover this imaginary file!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{
			Meteor.call('tasks.remove' , data._id , (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "removed!", 'success', 'growl-top-right' );
				}
			})
		  
		});

	}

	handleUndone(task){
		

		Meteor.call('tasks.markAsDone', task._id , !task.done , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{
				Bert.alert( "mark as done!", 'success', 'growl-top-right' );
			}
		});
	}

	render() {
		const { users , tasks } = this.props;

		const option = users.map((user)=>{
			if( agentRole(user._id) ){
				return <option key={user._id} value={user._id}>{user.profile.name}</option>
			}
			
		});
		
		const li = tasks.map((task)=>{
			if(!task.User){
				return <li>loading ...</li>
			}


			return <li key={task._id}>
				{
					(task.done) ? 
					<div>
						<a href="#" onClick={this.handleUndone.bind(this, task)}><i className="fa fa-undo"></i></a>
						{task.User.profile.name}<span className="label label-success">Im done!</span>
					</div> :
					<div>
						<a href="#" onClick={this.handleRemove.bind(this, task)}><i className="fa fa-trash"></i></a>
						{task.User.profile.name}
					</div>
				}		
			</li>
		});

 		return	<div className="panel panel-default">
					  <div className="panel-heading">Assign Task</div>
					  <div className="panel-body">
						<ul>
							{li}
						</ul>
						<form onSubmit={this.handleSubmit.bind(this)}>					  	
						  	<select name="agentId" onChange={this.handelSelect.bind(this)}>
						  		<option value=''>select agent</option>
						  		{ option }
						  	</select>
						  	<button type="submit">add</button>
						</form>
					  </div>
					</div>
	}
}

ValidationAsssignTask.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { validation } = props;

	var handle = Meteor.subscribe("users");
	Meteor.subscribe("tasks.all");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    users: Meteor.users.find({}).fetch(),
    tasks: Tasks.find({ validationId: validation._id, status: validation.status }).fetch()
  };
}, ValidationAsssignTask);