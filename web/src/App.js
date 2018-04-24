import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Material UI stuff
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

//Internal components
import Newpost from './components/Newpost.js';
import Newcommand from './components/Newcommand.js';


class App extends Component {
  render() {
    return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
            title="CrowdCar"
        />
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
