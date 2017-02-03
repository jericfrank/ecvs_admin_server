import React , { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import TasksSortingSingle from "./TasksSortingSingle.jsx";
import TasksSortingForm from "./TasksSortingForm.jsx";
import { Attach } from '../../../api/attachCertificate.js';

class TasksSorting extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attach , validation } = this.props;
		const tr = attach.map((attaches)=>{

			return <TasksSortingSingle key={attaches._id} attaches={attaches}/>
		});

 		return	<div>

 			<h1>For Sorting</h1>
 			<hr/>
 				<table className="table table-striped table-bordered">
	 				<thead>
	 					<tr>
	 						<th></th>
	 						<th>Worker</th>
	 						<th>Cv</th>
	 					</tr>
	 				</thead>
	 				<tbody>
	 					{tr}
	 				</tbody>
	 			</table>

	 		<TasksSortingForm currentUser={this.props.currentUser} validation={this.props.validation} />
	 		

	  	</div>
	}
}

TasksSorting.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { validation } = props;

    var handle = Meteor.subscribe("attach.all");

  return {
    listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    attach: Attach.find({validationId: validation._id}).fetch()
  };
}, TasksSorting);