import React, { Component } from "react";
import { signup } from "../../services/auth";
import { Link } from 'react-router-dom';
import "./Auth.css";
import googleLogo from "./google-logo.png";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    signup(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-text">
          <h4>Signup with username</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Choose a username: </label><br/>
            <input
              className="auth-input"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
            <br />

            <label htmlFor="password">Set a password: </label><br/>
            <input
              className="auth-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />

            {this.state.message && <p>{this.state.message}</p>}
            <br />
            <button className="auth-button" type="submit">
              Create account
            </button>
          </form>

          <h4>...or do you want to sign up with your Google account?</h4>
          <a href="http://localhost:5555/server/auth/google">
            <button className="google-button">
              <img
                className="google-logo"
                src={googleLogo}
                style={{ width: "15px" }}
                alt="google"
              />
              Continue with Google
            </button>
          </a>
          
          <p className="already"> Do you already have an account? <Link to='/login'>Login</Link></p>
          
        </div>
      </div>
    );
  }
}
