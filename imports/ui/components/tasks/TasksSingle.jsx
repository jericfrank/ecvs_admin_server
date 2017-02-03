import React, { Component , PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FormattedTime, FormattedDate } from 'react-intl';
import { Link } from 'react-router';

import { Tasks } from '../../../api/tasks.js';
import { clientStatusHelper , statusClassHelper } from '../../utils/helpers.js';

class TasksSingle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { task , tasks , currentUser } = this.props;
    
    if(!task.Validation ){
      return <tr>
        <td colSpan="6">loading .. </td>
      </tr>
    }

    const li = task.Validation.Files.map((file)=>{

      return <li key={file._id}>
        <a title={file.description} href={file.url()}>{file.original.name}</a>
      </li>
    });

    const agents = tasks.map((tas)=>{
      if(tas.User._id != currentUser._id)
      return <li key={tas._id}>
        {tas.User.profile.name} 
      </li>
    });

    return  <tr>
        <td>{ task._id }</td>
        <td><label className={statusClassHelper(task.status)}>{ clientStatusHelper(task.status) }</label></td>
        <td><FormattedDate value={task.Validation.createdAt}/>, <FormattedTime value={task.Validation.createdAt}/></td>
        <td>{ task.Validation.remarks }</td>
        <td>
          {li}
        </td>
        <td>
          {agents}
        </td>
        <td>
          { (task.done) ? <label className="label label-success">Yes</label> : 'No' }
        </td>
        <td>
          <Link to={`/tasks/${task._id}`} className="btn btn-default">view</Link>
        </td>
      </tr>
  }
}

export default createContainer((props) => {
  const { task } = props;

  var handle = Meteor.subscribe("tasks.all");

  return {
    listLoading: !handle.ready(),
    tasks: Tasks.find({ validationId:task.validationId }).fetch()
  };
}, TasksSingle);