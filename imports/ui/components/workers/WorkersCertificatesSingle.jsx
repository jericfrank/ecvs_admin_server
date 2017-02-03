import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';
import { Link } from 'react-router';

import { Certificates } from '../../../api/certificates.js';
import InputField from '../common/InputField.jsx';

export default class WorkersCertificatesSingle extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	toogleEdit: false,
	    	description: '',
	    	errors: {}
	    }

	}
	
	componentDidMount() {
		const { data } = this.props;

		this.setState({ description: data.description });
	}

	handleRemove(){
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
			const { data } = this.props;

			Meteor.call('certificates.remove', data._id, (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( 'deleted!', 'success', 'growl-top-right' );
				}
			})
		});

	}

	handelDescription(){
		this.setState({toogleEdit: !this.state.toogleEdit })
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSave(e){
		e.preventDefault();
		const { data } = this.props;

		Meteor.call('certificates.update', data._id, this.state.description , (err)=>{
				if(err){
					Bert.alert( err.message, 'danger', 'growl-top-right' );
				}else{
					this.handelDescription();
				}
			})

		
	}

	render() {
		const { data } = this.props;
		const { toogleEdit } = this.state;

		if( data.url() == null ){
			
			return <tr>
				<td colSpan="4">
					<p>uploading please wait..</p>
				</td>
			</tr>
		}


 		return	<tr>
 				<td>
 					<button onClick={this.handleRemove.bind(this)}><i className="fa fa-trash"></i></button>
 					<Link to={`/workers/${data.workersId}/certificate/${data._id}`} className="btn btn-default">view</Link> 

 				</td>
 				<td><a href={data.url()}>{data.original.name  }</a></td>
				<td>
					{
						(toogleEdit) ? 
						<form onSubmit={this.handleSave.bind(this)}>
							<InputField
					            field="description"
					            placeholder="Description"
					            type="text"
					            value={this.state.description}
					            error={this.state.errors.description}
					        	onChange={this.onChange.bind(this)}
					        />
						</form>:
						<p onClick={this.handelDescription.bind(this)}> {(data.description) ? data.description : '[click to add description]'}</p>
					}
				</td>
				<td>
					<FormattedDate value={data.uploadedAt}/>, <FormattedTime value={data.uploadedAt}/>
				</td>
			</tr>
	}
}