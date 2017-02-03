import React from "react"

export default class TasksSortingSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handleRemove(e){
		e.preventDefault();
		const { attaches } = this.props;

		swal({
		  title: "Are you sure?",
		  text: "You will not be able to recover this file!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{

		  	Meteor.call('attach.remove', attaches._id , (err)=>{
		  		if(err){
		  			Bert.alert( err.message, 'danger', 'growl-top-right' );
		  		}else{
		  			Bert.alert( "removed!", 'success', 'growl-top-right' );
		  		}
		  	});
		});
	}

	render() {
		const { attaches } = this.props;

			if(!attaches.Workers){

				return <tr>
					<td colSpan="2">loading ...</td>
				</tr>
			}
			return <tr>
				<td>
					<a onClick={this.handleRemove.bind(this)} className="btn btn-default"><i className="fa fa-trash"></i></a>
				</td>
				<td>
					{attaches.Workers.lastName}, {attaches.Workers.firstName}
				</td>
				<td>
					<a href={attaches.Certificates.url()}>
						{attaches.Certificates.original.name}
					</a>
				</td>
			</tr>

	}
}