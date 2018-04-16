import React, { Component } from 'react';

//Material UI stuff
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Newpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_value : ""
            text_value : ""
        }
    }

    send_post () => {
    fetch('http://localhost:5000/posts', {
          method: 'POST'
          body : 
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
            hintText="Type something!"
            fullWidth={true}
            multiLine={true}
        />
        <RaisedButton label="Send!" primary={true} />
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
