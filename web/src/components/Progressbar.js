import React, { Component } from 'react';

export default class Newcommand extends Component {
  constructor(props) {
    super(props)
      this.state = {
        time_left : 30,
        bar_color : "green"
      }
  }

  //Reduce bar width every second
  componentWillReceiveProps () {
    console.log(this.props);
    this.setState({
      time_left : this.props.time_prop, 
      bar_color : this.calc_bar_color(this.props.time_prop)
    })
  }

  calc_bar_color = (time) => {
    if (time > 10) {
      return "green";
    } else if (time <= 10 && time > 5) {
      return "orange";
    } else if (time <= 5) {
      return "red";
    } else {
      return "black"
    }
  }
  render() {
    const div_style={
      //width : this.props.sync_time_prop*3.43 + "%",
      width : this.state.time_left*6.43 + "%",
      height: "15px",
      backgroundColor : this.state.bar_color,
      borderRadius : "5%",
      transition: "width 1000ms ease-in-out"
    }
    return(
      <div class="progressBar" style={div_style} />
    )
  }
}
