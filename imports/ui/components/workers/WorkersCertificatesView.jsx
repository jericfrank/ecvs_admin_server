import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import WorkersEvidence from "./WorkersEvidence.jsx";
import { Certificates } from '../../../api/certificates.js';

class WorkersCertificatesView extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { certificates , listLoading } = this.props;

		if(listLoading){
			return <p>loading ..</p>
		}

 		return	<div>
 			<button onClick={browserHistory.goBack}>Back</button>
 			
 			<div className="row">
 				<div className="col-xs-4">
 					<h1>certificates</h1>
 					<li>Filename: <a href={certificates.url()}>{certificates.original.name}</a></li>
 				</div>

 				<div className="col-xs-8">
 					<WorkersEvidence { ...this.props }/>
 				</div>
 			</div>
	  	</div>
	}
}

WorkersCertificatesView.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

	var handle = Meteor.subscribe("certificates.all");
	
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    certificates: Certificates.findOne(params.certificateId)
  };
}, WorkersCertificatesView);