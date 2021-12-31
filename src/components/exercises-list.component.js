import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// component for making a table of exercises
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> |{" "}
      {/*links for edit and delete */}
      <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }
  //get an array of exercises from server and save it to state will be done before page is rendered
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => console.log(error.message));
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.message));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id), // if _id=id element deleted from state array and update the page
    });
  }
  exerciseList() {
    return this.state.exercises.map((curExercise) => {
      //return functional component in (bracers) with props
      return (
        <Exercise
          exercise={curExercise}
          deleteExercise={this.deleteExercise}
          key={curExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
