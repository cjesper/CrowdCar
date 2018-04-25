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

    this.setState({
      time_left : this.props.time_prop, 
      bar_color : this.calc_bar_color(this.props.time_prop)
    })
  }

  calc_bar_color = (time) => {
    if (time > 20) {
      return "green";
    } else if (time <= 20 && time > 10) {
      return "orange";
    } else if (time <= 10) {
      return "red";
    } else {
      return "black"
    }
  }
  render() {
    const div_style={
      width : this.state.time_left*3.43 + "%",
      height: "15px",
      backgroundColor : this.state.bar_color,
      borderRadius : "5%"
    }
    return(
      <div class="progressBar" style={div_style} />
    )
  }
}
