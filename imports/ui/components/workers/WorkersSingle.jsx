import React from "react";
import { Link } from 'react-router';

export default class WorkersSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handleRemove(){
		const { worker } = this.props;

		
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

			Meteor.call('workers.remove' , worker._id , (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "removed!", 'success', 'growl-top-right' );
				}
			})
		  
		});


	}

	render() {
		const { worker } = this.props;

 		return	<tr>
 			<td>{worker._id}</td>
 			<td>{worker.lastName}, {worker.firstName}</td>
 			<td>{ (worker.gender == 1) ? 'Male' : 'Female' }</td>
 			<td>{worker.birthdate}</td>
 			<td>{worker.remarks}</td>
 			<td>
 				<a href="#" className="btn btn-default" onClick={this.handleRemove.bind(this)}>
 					<i className="fa fa-trash"></i>
 				</a>

 				<Link to={`/workers/${worker._id}`} className="btn btn-default">view</Link>
 			</td>
 		</tr>
	}
}