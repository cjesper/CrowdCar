import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
//Material UI stuff
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

//Internal components
import Newpost from './components/Newpost.js';
import Newcommand from './components/Newcommand.js';


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_command : "Default",
            time_until_next : 30,
            bar_color : "green"
        }
    }

    componentDidMount() {
        var self = this;
        axios.get("http://localhost:5000/chosencommand/latest")
            .then(function (response) {
                var cmd_name = response.data[0].command_name;
                var time = response.data[0].command_time;
                var now = Date.now() / 1000;
                var time_until = Math.floor(time+30-now)
                console.log(time_until);
                self.setState({
                  current_command : cmd_name,
                  time_until_next : time_until
                })
                self.fill_progress_bar();
            })
            .then(function (error) {
                console.log(error)
            })
    }

  /* Gradually fill progress bar */
  fill_progress_bar = () => {
      setInterval(() => {
          var old_time = this.state.time_until_next;
          if (old_time < 0.2) {
            this.setState({
              time_until_next: 30,
              bar_color : "green"
            })
          } else {
          //Determine color of bar
          if (old_time < 20 && old_time > 10) {
            this.setState({
                bar_color : "orange"
            })
          } else if (old_time < 10) {
              this.setState({
                bar_color : "red"
              })
          }
          var new_time = old_time - 0.1;
          this.setState({ 
            time_until_next: new_time
      });
        }
    }, 100);
  }
  render() {
    const progress_bar_style={
      height: "10px",
      backgroundColor : this.state.bar_color,
      width : this.state.time_until_next*3.33 + "%"
    }
    return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
            title="CrowdCar"
        />
        <h3>Currently active command : {this.state.current_command} </h3>
        <h3>Next round in : {Math.floor(this.state.time_until_next)} </h3>
        <div style={progress_bar_style} />
        <Divider />
        <Newcommand command_name_prop="PARTY" image_name_prop="party.jpg" />
        <Newcommand command_name_prop="ROCK" image_name_prop="rock.jpeg"/>
        <Newcommand command_name_prop="BREAK CAR" image_name_prop="broken_car.png"/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
