import React , { PropTypes } from "react";
import { browserHistory } from 'react-router';
import { FormattedTime, FormattedDate } from 'react-intl';
import { createContainer } from 'meteor/react-meteor-data';
import filesize from 'file-size';

import ValidationAsssignTask from './ValidationAsssignTask.jsx';
import ValidationResults from './ValidationResults.jsx';
import CommentsWrapper from '../comments/CommentsWrapper.jsx';

import { Validation } from '../../../api/certValidation.js';
import { statusHelper , statusClassHelper } from '../../utils/helpers.js';

class ValidationView extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handleUpdateStatus(e){
		e.preventDefault();

		const { validation } = this.props;
		
		swal({
		  title: "Are you sure?",
		  text: "This will jump to another system process!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, do it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{

			Meteor.call('validation.updateStatus', validation._id, validation.status , (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "updated!", 'success', 'growl-top-right' );
				}
			});
		  
		});
		
	}

	handleBilling(e){
		e.preventDefault();
		const { validation } = this.props;

		swal({
		  title: "Are you sure?",
		  text: "This will jump to Billing process!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, do it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{

			Meteor.call('validation.billing', validation._id, (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "updated!", 'success', 'growl-top-right' );
				}
			});
		  
		});

	}

	handleUndoStatus(e){
		e.preventDefault();
		const { validation } = this.props;

		swal({
		  title: "Are you sure?",
		  text: "This will go back to previos system process! Some data migth be affected",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, do it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{

			Meteor.call('validation.undoUpdateStatus', validation._id, validation.status , (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "updated!", 'success', 'growl-top-right' );
					
				}
			});
		  	

		});
	}

	render() {
		const { validation } = this.props;

		if(!validation || !validation.User){
			return <p>please wait..</p>
		}

		const tr = validation.Files.map((file)=>{

			return <tr key={file._id} >
				<td>
					<a href={ file.url() }>
						{ file.original.name }
					</a>
				</td>
				<td>{ filesize(file.original.size).human() }</td>
				<td>{ file.original.type }</td>
				<td>{ file.description }</td>
			</tr>
		});
		
 		return	<div>
 			<button onClick={browserHistory.goBack}>Back</button>

 			<div className="row">
 				<div className="col-xs-4">
 					<div className="panel panel-default">
					  <div className="panel-heading">Validation</div>
					  <div className="panel-body">
					    <label>ID:</label> { validation._id }<br/>
					    <label>Client:</label> { validation.User.profile.name }<br/>
					    <label>Status:</label> <span className={statusClassHelper(validation.status)}>{ statusHelper(validation.status) }</span><br/>
					    <label>Remarks:</label> { validation.remarks }<br/>
					    <label>Date:</label> <FormattedDate value={validation.createdAt}/>, <FormattedTime value={validation.createdAt}/>
					  </div>
					</div>
 				</div>

 				<div className="col-xs-8">
 					<div className="panel panel-default">
					  <div className="panel-heading">Files</div>
					  <div className="panel-body">
					  	<table className="table table-striped table-bordered">
			 				<thead>
			 					<tr>
			 						<th>Filename</th>
			 						<th>Size</th>
			 						<th>Type</th>
			 						<th>Description</th>
			 					</tr>
			 				</thead>
			 				<tbody>
			 					{tr}
			 				</tbody>
			 			</table>

					  </div>
					</div>
				</div>

				 <div className="col-xs-4">
				 	
				 { ( (validation.status != 2) && (validation.status != 3) && (validation.status != 5) ) ? <ValidationAsssignTask  {...this.props}  /> : '' }

				</div>

				<div className="col-xs-8">
					<CommentsWrapper {...this.props}/>
				</div>

				<div className="col-xs-8">
					<ValidationResults validation={this.props.validation}/>
				</div>

				{ ((validation.status == 3) || (validation.status == 5)) ?
					'' :
					 (validation.status == 2) ? <button onClick={this.handleBilling.bind(this)} type="button" className={'btn btn-primary'}>
						For Billing
					</button> :
					<button onClick={this.handleUpdateStatus.bind(this)} type="button" className={'btn btn-primary'}>
						Update Status
					</button>
					
				}
				
				{ ( (validation.status != 0) && (validation.status != 3) ) ? <button onClick={this.handleUndoStatus.bind(this)} type="button" className={'btn btn-danger'}>
					undo status
				</button> : '' }

 			</div>

 		</div>
	}
}

ValidationView.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

	var handle = Meteor.subscribe("validation.all");
	
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    validation: Validation.findOne(params._id)
  };
}, ValidationView);