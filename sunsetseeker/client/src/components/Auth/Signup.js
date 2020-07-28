import React, { Component } from 'react';
import { signup } from '../../services/auth';


export default class Signup extends Component {
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

    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/');
      }
    });
  };


  render() {
    return (
      <>
        <h4>Signup with email</h4>
        <form onSubmit={this.handleSubmit}>

            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />
            <br/>

            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
            />

          {this.state.message && (
            <p>{this.state.message}</p>
          )}
          <br/>
          <button type='submit'>Signup</button>
        </form>

      </>
    );
  }
}