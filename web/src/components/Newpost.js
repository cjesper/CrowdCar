import React, { Component } from 'react';

//Material UI stuff
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Newpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_value : "",
            text_value : ""
        }
    }

    handleNickFieldChange = (e) => {
      this.setState({
        nick_value : e.target.value
      });
    } 
    
    handleTextFieldChange = (e) => {
      this.setState({
        text_value: e.target.value
      });
    } 

    send_post = () => {
        console.log(this.state);
        var data = new FormData();
        data.append('text', this.state.text_value);


        fetch('http://localhost:5000/posts', {
          method: 'POST',
          body : data
        })
        .then(function (res) {
        return res.json()
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
      <div key={1} style={{margin : "2px"}}>
        <TextField
            onChange={this.handleTextFieldChange}
            hintText="Type something!"
            fullWidth={true}
            multiLine={true}
        />
        <RaisedButton label="Send!" onClick={this.send_post} primary={true} />
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

export default Newpost;
