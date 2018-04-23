import React, { Component } from 'react';
import axios from 'axios';

//Material UI stuff
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Newcommand extends Component {

    send_command = () => {
        axios.post('http://localhost:5000/commands', {
            'command_name': "HEADLIGHTS"
        })
        .then(function (res) {
            console.log(res); 
        })
      .then(function (json) {
        console.log(json)
      }.bind(this))
      .catch((error) => {
        console.log(error);
      });
    }
  render() {
    const paper_children = [
        <div>
            <h1 style={{textAlign : "center"}}> Turn on headlights </h1>
            <RaisedButton label="Send!" onClick={this.send_command} secondary={true} />
        </div>
    ]
    return (
        <Paper
            style={{border : "1px solid black"}}
            children={paper_children}
            zDepth={1}
        />
    );
  }
}

export default Newcommand;
