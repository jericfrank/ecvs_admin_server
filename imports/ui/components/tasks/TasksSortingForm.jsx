import React , { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import { Certificates } from '../../../api/certificates.js';
import { Workers } from '../../../api/workers.js';

class TasksSortingForm extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	certificate: {}
	    }
	}
	
	componentDidMount() {
	}

	handleGetCertificate(e){
		e.preventDefault();

		const _id = e.target.value;
		const certificate = Certificates.find({workersId: _id}).fetch();

		this.setState({certificate: certificate});
	}

	handleSubmit(e){
		e.preventDefault();
		const { certificate , worker } = this.refs;
		const { validation } = this.props;

		if(!certificate.value){
			Bert.alert( 'certificate required!', 'danger', 'growl-top-right' );
			return false;
		}

		const data = {
			certificatesId: certificate.value,
			workersId: worker.value,
			validationId: validation._id
		}

		Meteor.call('attach.insert', data , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{
				Bert.alert( "added!", 'success', 'growl-top-right' );
			}
		})
	}

	render() {
		const { workers , certificates } = this.props;
		const { certificate } = this.state;

		const workerOption = workers.map( (worker)=>{

			return <option key={worker._id} value={worker._id}>{worker.lastName}, {worker.firstName}</option>
		});

		const certificateOption = _.map(certificate, (data)=>{
        	
        	return <option key={data._id} value={data._id}>{data.original.name} {data.description}</option>
        });

 		return	<div className="panel panel-default">
		  	<div className="panel-heading">Add Certificate</div>
		  	<div className="panel-body">
		  		
		  		<form onSubmit={this.handleSubmit.bind(this)}>
		  			<div className="form-group">
				      	<label className="control-label">Worker</label>
				      	<select ref="worker" className="form-control" onChange={this.handleGetCertificate.bind(this)}>
				      		{workerOption}
				      	</select>
				    </div>
				    <div className="form-group">
				      	<label className="control-label">Certificate</label>
				      	<select ref="certificate" className="form-control">
				      		{certificateOption}
				      	</select>
				    </div>

				    <input type="submit" />
		  		</form>

		  	</div>
  		</div>
	}
}

TasksSortingForm.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {


	var handle = Meteor.subscribe("certificates.all");
	
	Meteor.subscribe("workers.all");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    certificates: Certificates.find({  }).fetch(),
    workers: Workers.find({ }).fetch()
  };
}, TasksSortingForm);