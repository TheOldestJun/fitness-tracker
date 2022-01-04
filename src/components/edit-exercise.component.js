import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChageUsername = this.onChageUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch((e) => console.log(e.message));
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ users: res.data.map((user) => user.username) });
      })
      .catch((e) => console.log(e.message));
  }
  onChageUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setSstate({
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e) {
    e.preventDafault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);
    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));
    window.location("/");
  }

  //insert last code here!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              className="form-control"
              value={this.state.username}
              onChange={this.onChageUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option value={user} key={user}>
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
            <label>Duration:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
