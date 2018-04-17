import React, { Component } from 'react';

//Material UI stuff
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class Newcommand extends Component {

      constructor(props) {
        super(props);
        this.state = {
            value: 2,
            command : ""
        };
      }
    handle_change = (event, index, value) => {
        console.log(value);
        console.log(event);
        console.log(index);
        this.setState({
            value
        }); 
    }
    
    send_command = () => {
        alert("Sent command!");
        console.log(this.state);
    }
    render() {
    const paper_children = [
        <div>
            <DropDownMenu value={this.state.value} openImmediately={false} onChange={this.handle_change}>
                <MenuItem value={1} primaryText="LEDs left" />
                <MenuItem value={2} primaryText="Windshield Wipers" />
                <MenuItem value={3} primaryText="Sound!" />
                <MenuItem value={4} primaryText="LEDs right!" />
            </DropDownMenu>
        <RaisedButton onClick={this.send_command} label="Send command!" primary={true} />
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
