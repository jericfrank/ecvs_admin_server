import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';

import InputField from '../common/InputField.jsx';

export default class TasksQoutationSingle extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	toogle: false,
	    	remarks: '',
	    	cost: '',
	    	errors: {}
	    }
	}
	
	componentDidMount() {
	}

	onChange(e){
    	this.setState({ [e.target.name]: e.target.value });
  	}

	handleToogle(){
		const { attaches } = this.props;
		this.setState({
			toogle: !this.state.toogle,
			remarks: attaches.remarks,
			cost: attaches.cost
		})
	}

	handleSubmit(e){
		e.preventDefault();
		const { attaches } = this.props;

		Meteor.call('attach.update', attaches._id,this.state , (err) => {
	        if(err) {
	          Bert.alert( err.message, 'danger', 'growl-top-right' );
	        }else {
	          this.setState({errors: {}});
	          this.handleToogle();
	        }
    	});
	}	

	render() {
		const { attaches } = this.props;
 		const { toogle } = this.state;

 		if(toogle){
 			return <tr>
				<td>
					<a href={attaches.Certificates.url()}>
						{attaches.Certificates.original.name}
					</a>
				</td>
				<td><FormattedDate value={attaches.createdAt}/>, <FormattedTime value={attaches.createdAt}/></td>
				<td colSpan="3">
					<form onSubmit={this.handleSubmit.bind(this)}>
			          	<InputField
			            	field="remarks"
			            	label="Remarks"
			            	placeholder="Remarks"
			            	value={this.state.remarks}
			            	error={this.state.errors.remarks}
			            	onChange={this.onChange.bind(this)}
			          	/>
			          	<InputField
			            	field="cost"
			            	placeholder="Cost"
			            	label="Cost"
			            	value={this.state.cost}
			            	error={this.state.errors.cost}
			            	onChange={this.onChange.bind(this)}
			          	/>
			          	<button type="submit">Save</button>
			          	<a href="#" onClick={this.handleToogle.bind(this)}>cancel</a>
				    </form>
				</td>
			</tr>
 		}

		return <tr>
			<td>
				<a href={attaches.Certificates.url()}>
					{attaches.Certificates.original.name}
				</a>
			</td>
			<td><FormattedDate value={attaches.createdAt}/>, <FormattedTime value={attaches.createdAt}/></td>
			<td>{attaches.remarks}</td>
			<td>{attaches.cost}</td>
			<td>
				<button onClick={this.handleToogle.bind(this)}>update</button>
			</td>
		</tr>
	}
}