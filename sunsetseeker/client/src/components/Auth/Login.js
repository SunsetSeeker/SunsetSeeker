import React, { Component } from 'react';
import { login } from '../../services/auth';
import googleLogo from './google-logo.png'; 

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    message: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push('/list');
      }
    });
  };7

  logInGoogle=event => {
    event.preventDefault(); 
    console.log("this")
  }



  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
     
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />


            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
            />
  
          {/* {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )} */}
          
          <button type='submit'>Login</button>
        </form>
        <br/>
        <h4>You have a Google account?</h4>




        <a href="http://localhost:5555/server/auth/google">
              <button className="auth-btn sort-button"> <img src={googleLogo} style={{width: "15px"}} alt="google"/>Sign up with Google</button>
            </a>
        {/* <form >
          <button><img src={googleLogo} style={{width:"15px"}} alt="google icon"/>  Continue with Google</button>
        </form> */}

      </>
    );
  }
}