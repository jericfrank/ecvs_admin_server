import React from "react";
import { createContainer } from 'meteor/react-meteor-data';

import TasksJobOrderSingle from "./TasksJobOrderSingle.jsx";
import { Attach } from '../../../api/attachCertificate.js';

class TasksJobOrder extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attach } = this.props;

		const tr = attach.map((attaches)=>{

			return <TasksJobOrderSingle key={attaches._id} attaches={attaches}/>
		});

 		return	<div>
 			<div className="panel panel-default">
				<div className="panel-heading">Job Order</div>
				<div className="panel-body">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>ID</th>
								<th>Worker</th>
								<th>Cv</th>
								<th>Active(if added by client)</th>
								<th>Evidence</th>
							</tr>
						</thead>
						<tbody>
							{tr}
						</tbody>
					</table>
				</div>
			</div>
 			
	  	</div>
	}
}

export default createContainer((props) => {
	const { validation } = props;

    var handle = Meteor.subscribe("attach.all");

  return {
    listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    attach: Attach.find({validationId: validation._id}).fetch()
  };
}, TasksJobOrder);