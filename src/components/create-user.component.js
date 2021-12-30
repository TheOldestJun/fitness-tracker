import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.OnChangeUsername = this.OnChangeUsername.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
    this.state = {
      username: "",
    };
  }
  OnChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  OnSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
    };
    console.log(newUser); // !!!!!!!!!-----SERVER API TO ADD HERE------!!!!!!!!!
    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => console.log(res.data));
    this.setState({ username: "" }); // returning state for default
  }
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.OnSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.OnChangeUsername}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
