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

  calc_width = (time) => {
    if (time >= 2) {
      return time*6.6;
    } else if (time == 0) {
        return 100;
    } else {
      return 0;
    }
  }

  render() {

    const div_style={
      width : this.calc_width(this.state.time_left)+"%",
      height: "15px",
      backgroundColor : this.state.bar_color,
      borderRadius : "5%",
      //transition: "width 1000ms"
    }
    return(
      <div class="progressBar" style={div_style} />
    )
  }
}
