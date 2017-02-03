import React, { Component } from 'react';

import { validateLogin } from '../../validation/validateLogin.js';
import InputField from '../common/InputField.jsx';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  onChange(e){

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const { errors , isValid } = validateLogin(this.state);
    if(!isValid){
      this.setState({ errors });
      return false;
    }

    const { username , password } = this.state;

    Meteor.loginWithPassword(username, password, (err) => {
        if(err) {
          Bert.alert( err.message, 'danger', 'growl-top-right' );
        }else {
          this.setState({errors: {}})
        }
    });

  }

  render() {

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Admin Login</h2>
          <InputField
            field="username"
            placeholder="Username"
            value={this.state.username}
            error={this.state.errors.username}
            onChange={this.onChange.bind(this)}
          />
          <InputField
            field="password"
            placeholder="Password"
            type="password"
            error={this.state.errors.password}
            onChange={this.onChange.bind(this)}
          />
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
}

export default LoginForm;