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
        <h2 style={{textAlign : "center"}}>Control the damn car</h2>
        <Divider />
        <Newpost />
        <Newcommand />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
