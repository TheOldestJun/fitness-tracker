import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class ExercisesList extends Component {
  constructor(props) {
    super(props)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.state = {exercises = []}
  }
  //get an array of exercises from server and save it to state will be done before page is rendered
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/').then(response => {
      this.setState({exercises: response.data})
    }).catch((error)=> console.log(error.message))
  }

  render() {
    return <h2>This is exercises list</h2>;
  }
}
