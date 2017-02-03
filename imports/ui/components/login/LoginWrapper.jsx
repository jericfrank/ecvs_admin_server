import React, { Component } from 'react';

import LoginForm from './LoginForm.jsx';

class LoginWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="container">
        
        <div className="row">
          <div className="col-xs-6">
            <LoginForm />
          </div>
          
        </div>
      </div>
    );
  }
}

export default LoginWrapper;