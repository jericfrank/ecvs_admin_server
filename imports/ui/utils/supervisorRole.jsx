import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import LoginWrapper from '../components/login/LoginWrapper.jsx';

import { supervisorRole } from './roleHelper.js';

export default function(ComposedComponent) {
	class SupervisorRole extends React.Component {
		constructor() {
		    super()
		}

		handleLogout(e){
			e.preventDefault();
			Meteor.logout();
		}

		render() {
			if(this.props.currentUser){
				const { _id } = this.props.currentUser;

				if(supervisorRole( _id )){
					return <ComposedComponent {...this.props} />
				}
			}
			
			return <p>not allowed access. <a href="#" onClick={this.handleLogout.bind(this)}>logout me.</a></p>
		}
	}

	return createContainer(() => {

	  return {
	    currentUser: Meteor.user()
	  };
	}, SupervisorRole);
}