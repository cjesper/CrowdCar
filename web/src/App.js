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
            current_command : "Default"
        }
    }

    componentDidMount() {
        var self = this;
        axios.get("http://localhost:5000/chosencommand")
            .then(function (response) {
                self.setState({
                    current_command : response.data.split(" ")[0]
                })
            })
            .then(function (error) {
                console.log(error)
            })
    }

  render() {
    return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
            title="CrowdCar"
        />
        <h2>Currently active command : {this.state.current_command} </h2>
        <Divider />
        <Newcommand command_name_prop="PARTY"/>
        <Newcommand command_name_prop="ROCK" />
        <Newcommand command_name_prop="BREAK CAR"/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
