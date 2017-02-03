import React, { Component , PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import TasksSingle from './TasksSingle.jsx';
import { Tasks } from '../../../api/tasks.js';

class TasksWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { tasks , currentUser } = this.props;
    
    const tr = tasks.map( (task)=>{

      return <TasksSingle key={task._id} currentUser={currentUser} task={task}/>
    });

    return  <div>
      
       <label>Tasks</label>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Date Added</th>
            <th>Remarks</th>
            <th>Files</th>
            <th>Assign Agent</th>
            <th>Mark as Done?</th>
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


TasksWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
    var handle = Meteor.subscribe("tasks.owner");

  return {
    listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    tasks: Tasks.find({userId: Meteor.userId()}, { sort: { createdAt: -1 } }).fetch()
  };
}, TasksWrapper);