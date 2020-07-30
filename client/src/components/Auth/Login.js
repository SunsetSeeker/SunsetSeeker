import React, { Component } from "react";
import { login } from "../../services/auth";
import googleLogo from './google-logo.png';
import "./Auth.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
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

    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/list");
      }
    });
  };
  7;

  logInGoogle = (event) => {
    event.preventDefault();
    console.log("this");
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-text">
          <h4>Login</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username: </label>
            <br />
            <input
              className="auth-input"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />

            <br />
            <label htmlFor="password">Password: </label>
            <br />
            <input
              className="auth-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />

            {/* {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )} */}
            <br />
            <button className="auth-button" type="submit">
              Login
            </button>
          </form>
          <br />
          <h4>...or do you want to log in with your Google account?</h4>
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
          {/* <h4>You have a Google account?</h4>
        <a href="http://localhost:5555/server/auth/google">
              <button className="auth-btn sort-button"> <img src={googleLogo} style={{width: "15px"}} alt="google"/>Sign up with Google</button>
            </a> */}
          {/* <form >
          <button><img src={googleLogo} style={{width:"15px"}} alt="google icon"/>  Continue with Google</button>
        </form> */}
        </div>
        <p className="already">
          {" "}
          You have no account yet? <Link to="/signup">Signup</Link>
        </p>
      </div>
    );
  }
}
