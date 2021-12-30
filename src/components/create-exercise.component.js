import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExrcise extends Component {
  constructor(props) {
    super(props);
    //binding methods to .this
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      //set initial component state
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }
  //react routin invoke immedietly after component is mounted
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username), //filling users array for dropdown list
            username: response.data[0].username, // state.username setting first element
          });
        }
      })
      .catch((err) => console.log(`Error: ${err.message}`));
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeDuration(e) {
    this.setState({ duration: e.target.value });
  }
  onChangeDate(date) {
    this.setState({ date: date });
  }
  onSubmit(e) {
    e.preventDefault(); //prevent form submit behavior by default HTML
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
    console.log(exercise); //!!!!!!!---------add backend api here----------!!!!!!!!!!!
    window.location = "/"; //updating the location: after submiting form user is taken back home page
  }
  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username} // default will be a first user in users array first in DB
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                //and deploy array of users created early to options in dropdown one by one
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
