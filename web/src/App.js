import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
//Material UI stuff
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

//Internal components
import Newpost from './components/Newpost.js';
import Newcommand from './components/Newcommand.js';
import Progressbar from './components/Progressbar.js';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_command : "Default",
            time_until_next : 30,
            bar_color : "green",
            disable_vote : false,
            open_dialog : true,
        }
    }

    componentWillMount() {
        var self = this;
        setTimeout(() => {
            self.setState({
              open_dialog: false
            })
        }, 2500)

        axios.get("http://localhost:5000/chosencommand/latest")
            .then(function (response) {
                var cmd_name = response.data[0].command_name;
                var time = response.data[0].command_time;
                var now = Date.now() / 1000;
                var time_until = Math.floor(time+30-now)
                self.setState({
                  current_command : cmd_name,
                  time_until_next : time_until,
                })
                self.poll_command_name();
            })
            .then(function (error) {
                console.log(error)
            })
    }
  
  /* Poll for new command name */
  poll_command_name = () => {
      var self = this;
      setInterval(() => {
        var old_time = self.state.time_until_next;
        if (old_time < 1) {
            axios.get("http://localhost:5000/chosencommand/latest")
            .then(function (response) {
                var cmd_name = response.data[0].command_name;
                self.setState({
                  current_command : cmd_name,
                  time_until_next : 30
                })
            })
            .then(function (error) {
                console.log(error)
            })
        }
        this.setState({
          time_until_next : old_time - 1
        }) 
      }, 1000)
  }

   render() {

    const div_style = {
      height: "40px",
      lineHeight: "40px",
      width: "100%",
      textAlign: "center",
      backgroundColor : "blue",
      color: "white",
      fontSize: "28px"
    }
    return (
    <MuiThemeProvider>
      <div className="App">
        <div style={div_style}>
          CrowdCar
        </div>
        <h3>Now Running: {this.state.current_command} </h3>
        <h3>Next round in : {Math.floor(this.state.time_until_next)} </h3>
        <Progressbar time_prop={this.state.time_until_next}/>
        <Divider />
        <Newcommand current_command_prop={this.state.current_command} command_name_prop="PARTY" disable_vote_prop={this.state.disable_vote} image_name_prop="party.jpg" />
        <Newcommand current_command_prop={this.state.current_command} command_name_prop="ROCK" disable_vote_prop={this.state.disable_vote} image_name_prop="rock.jpeg"/>
        <Newcommand current_command_prop={this.state.current_command} command_name_prop="BREAK" disable_vote_prop={this.state.disable_vote} image_name_prop="broken_car.png"/>
      <Dialog
          open={this.state.open_dialog}
          title="Vote for what the car should do next!"
        />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
