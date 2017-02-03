import React from "react"
import _ from "lodash";

import { validateWorkers } from '../../validation/validateWorkers.js';
import InputField from '../common/InputField.jsx';

export default class WorkersForm extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	firstName: '',
	    	lastName: '',
	    	birthdate: '',
	    	remarks: '',
	    	gender: 1,
	    	errors: {}
	    }
	}
	
	componentDidMount() {
	}

	onChange(e){
		const { errors } = this.state;

		delete errors[e.target.name];

	    this.setState({ [e.target.name]: e.target.value });
	  }
	 
	 handleSubmit(e){
	 	e.preventDefault();
	 	const { errors , isValid } = validateWorkers(this.state);
	 	 if(!isValid){
	      this.setState({ errors });
	      return false;
	    }

	    delete this.state.errors;

	    Meteor.call('workers.insert', this.state , (err)=>{
	    	if(err){
	    		Bert.alert( err.message, 'danger', 'growl-top-right' );
	    	}else{
	    		Bert.alert( 'Save!', 'success', 'growl-top-right' );
	    		this.setState({
			    	firstName: '',
			    	lastName: '',
			    	birthdate: '',
			    	remarks: '',
			    	gender: 1,
			    	errors: {}
			    })
	    	}
	    });
	  	
	 }

	handleSelect(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {

 		return	<div>
 			
 			 <label>WorkersForm</label>
 			<form onSubmit={this.handleSubmit.bind(this)}>
 				<InputField
		            field="firstName"
		            label="Firstname"
		            placeholder="Firstname"
		            value={this.state.firstName}
		            error={this.state.errors.firstName}
		            onChange={this.onChange.bind(this)}
		          />
		          <InputField
		            field="lastName"
		            label="lastName"
		            placeholder="lastName"
		            value={this.state.lastName}
		            error={this.state.errors.lastName}
		            onChange={this.onChange.bind(this)}
		          />
		         
		         <div className="form-group">
			      	<label className="control-label">Gender</label>
			      	<select className="form-control" name="gender" onChange={this.handleSelect.bind(this)}>
			      		<option value="1">Male</option>
			      		<option value="0">Female</option>
			      	</select>
			    </div>


		          <InputField
		            field="birthdate"
		            label="Birthdate"
		            placeholder="birthdate"
		            value={this.state.birthdate}
		            error={this.state.errors.birthdate}
		            onChange={this.onChange.bind(this)}
		            type="date"
		          />
		          <InputField
		            field="remarks"
		            label="Remarks"
		            placeholder="remarks"
		            value={this.state.remarks}
		            error={this.state.errors.remarks}
		            onChange={this.onChange.bind(this)}
		          />

		        <input type="submit" />
 			</form>
	  	</div>
	}
}