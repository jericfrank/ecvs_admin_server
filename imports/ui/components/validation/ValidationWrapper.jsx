import React , { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import ValidationSingle from "./ValidationSingle.jsx";
import { Validation } from '../../../api/certValidation.js';
import { statusHelper } from '../../utils/helpers.js';

class ValidationWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { validation } = this.props;

		const tr = validation.map((file)=>{

			return <ValidationSingle key={file._id} data={file}/>
		});

 		return	<div>
 			
 			 <label>ValidationWrapper</label>
 			<table className="table table-striped table-bordered">
 				<thead>
 					<tr>
 						<th>ID</th>
 						<th>Client</th>
 						<th>Status</th>
 						<th>Date Added</th>
 						<th>Remarks</th>
 						<th>Files</th>
 						<th>Assign Agent</th>
 						<th></th>
 					</tr>
 				</thead>
 				<tbody>
 					{tr}
 				</tbody>
 			</table>
 			
	  	</div>
	}
}

ValidationWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {


	var handle = Meteor.subscribe("validation.all");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    validation: Validation.find({}, { sort: { updatedAt: -1 } }).fetch()
  };
}, ValidationWrapper);