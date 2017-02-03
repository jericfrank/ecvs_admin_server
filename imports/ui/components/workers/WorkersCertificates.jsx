import React, { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';
import Dropzone from "react-dropzone";
import filesize from 'file-size';
import { Certificates } from '../../../api/certificates.js';

import WorkersCertificatesSingle from "./WorkersCertificatesSingle.jsx";

class WorkersCertificates extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handleUpload(files){
		const { currentUser , worker } = this.props;

	      files.forEach((file)=> {
	      	var metaFile = new FS.File(file);
	            metaFile.userId = currentUser._id;
	            metaFile.workersId = worker._id;

	          Certificates.insert(metaFile,  (err, fileObj)=> {
	              // console.log(fileObj  );
	          });
	      });
	}

	render() {
		const { certificates } = this.props;

		const tr = certificates.map( (certificate)=>{

			return <WorkersCertificatesSingle key={certificate._id} data={certificate} />
		});	

 		return	<div className="panel panel-default">
  			<div className="panel-heading">Certificates</div>
  			<div className="panel-body">
  				
  				<Dropzone onDrop={this.handleUpload.bind(this)}>
	              <div>Try dropping some files here, or click to select files to upload.</div>
	            </Dropzone>

  				<table className="table table-striped table-bordered">
	 				<thead>
	 					<tr>
	 						<th></th>
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
		</div>
	}
}

WorkersCertificates.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { worker } = props;


	var handle = Meteor.subscribe("certificates.all");
	
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    certificates: Certificates.find({workersId: worker._id }).fetch()
  };
}, WorkersCertificates);