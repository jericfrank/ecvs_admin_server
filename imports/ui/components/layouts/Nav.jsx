import React, { Component , PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { adminRole , supervisorRole , agentRole } from '../../utils/roleHelper.js';

const nav = {
	admin: <ul className="nav navbar-nav">
	      	<li><Link to={`/`}>Admin Dashboard</Link></li>
	      	<li><Link to={`/workers`}>Workers</Link></li>
	      </ul>,
	supervisor: <ul className="nav navbar-nav">
	      	<li><Link to={`/`}>Supervisor Dashboard</Link></li>
	      	<li><Link to={`/validation`}>Validation</Link></li>
	      	<li><Link to={`/workers`}>Workers</Link></li>
	      </ul>,
	agent: <ul className="nav navbar-nav">
	      	<li><Link to={`/`}>Agent Dashboard</Link></li>
	      	<li><Link to={`/tasks`}>Tasks</Link></li>
	      	<li><Link to={`/workers`}>Workers</Link></li>
	      </ul>
}

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  
  handleLogout(e){
  	e.preventDefault();
  	Meteor.logout();
  }

  render() {
  	const { currentUser } = this.props;

    return (
      <nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="/">ECVS</a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      
			      { (adminRole(currentUser._id)) ? nav.admin : null }
			      { (supervisorRole(currentUser._id)) ? nav.supervisor : null }
			      { (agentRole(currentUser._id)) ? nav.agent : null }
			      
			      <ul className="nav navbar-nav navbar-right">
			        <li>
			        	<a href="#" onClick={this.handleLogout.bind(this)}>
			        		logout, {currentUser.profile.name}
			        	</a>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
    );
  }
}

Nav.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Nav);