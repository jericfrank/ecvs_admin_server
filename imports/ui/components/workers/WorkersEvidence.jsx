import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import Dropzone from "react-dropzone";
import { FormattedTime, FormattedDate } from 'react-intl';

import WorkersEvidenceSingle from './WorkersEvidenceSingle.jsx';
import { Evidence } from '../../../api/evidence.js';

class WorkersEvidence extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handleUpload(files){
		const { currentUser , certificates } = this.props;

	      files.forEach((file)=> {
	      	var metaFile = new FS.File(file);
	            metaFile.userId = currentUser._id;
	            metaFile.certificatesId = certificates._id;
	            metaFile.description = '';
	            
	          Evidence.insert(metaFile,  (err, fileObj)=> {
	              // console.log(fileObj  );
	          });
	      });
	}

	render() {
		const { evidence } = this.props;

		const tr = evidence.map( (evidences)=>{

			return <WorkersEvidenceSingle key={evidences._id} data={evidences}/>
		});

 		return	<div>
 			<h1>Evidence</h1>

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
	}
}

WorkersEvidence.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

	var handle = Meteor.subscribe("evidence.all");
	
  return {
    listLoading: !handle.ready(),
    evidence: Evidence.find({certificatesId: params.certificateId}).fetch()
  };
}, WorkersEvidence);