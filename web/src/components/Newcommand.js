import React, { Component } from 'react';
import axios from 'axios';

//Material UI stuff
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import car from '../broken_car.png';
import party from '../party.jpg';
import rock from '../rock.jpeg';


class Newcommand extends Component {
    constructor(props) {
      super(props)
      console.log(this.props);
      this.state = {
        show_dialog : false,
        disable_button : this.props.disable_vote_prop 
      }
    }
    send_command = () => {
        axios.post('http://localhost:5000/commands', {
            'command_name': this.props.command_name_prop
        })
        .then(function (res) {
            console.log(res); 
        })
      .then(function (json) {
        this.trigger_dialog();
        this.disable_button();
        console.log(json)
      }.bind(this))
      .catch((error) => {
        console.log(error);
      });
    }

    trigger_dialog = () => {
      this.setState({
        show_dialog: true
      })
      setTimeout(() => {
          this.setState({ 
            show_dialog: false 
      });
    }, 1000);
    }

    disable_button = () => {
      //Prevent voting for the same for 5 seconds
      this.setState({
        disable_button: true
      })
      setTimeout(() => {
          this.setState({ 
            disable_button: false 
      });
    }, 5000);
    }

  render() {
    const paper_children = [
        <div>
            <img style={{width: "100%", height: "10%", maxHeight: "100px"}} src={require('../' + this.props.image_name_prop)} />
            <h1 style={{textAlign : "center"}}> {this.props.command_name_prop}</h1>
            <RaisedButton disabled={this.state.disable_button} label="VOTE!" onClick={this.send_command} secondary={true} />
        </div>
    ]

    return (
        <div>
            <Paper
                style={{border : "1px solid black"}}
                children={paper_children}
                zDepth={1}
            />
            <Dialog
              open={this.state.show_dialog}
              title="Thank you for voting!" 
            />
        </div>
    );
  }
}

export default Newcommand;
