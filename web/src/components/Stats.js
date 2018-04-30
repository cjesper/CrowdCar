import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';

//Material ui stuff
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class Stats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      party_votes : 0,
      rock_votes : 0,
      break_votes : 0,
      wedding_votes : 0
    }
  }

  componentWillMount() {
    setInterval(() => {
      this.poll_stats();
      this.calc_bar_height();
    }, 2000)
  
  }

  poll_stats = () => {
      var self = this;
      axios.get("http://localhost:5000/commands/stats")
            .then(function (response) {
                console.log(response.data); 
                self.setState({
                  party_votes : response.data[0],
                  rock_votes : response.data[1],
                  break_votes : response.data[2],
                  wedding_votes : response.data[3],
                })
            })
            .then(function (error) {
                if (error) {
                    console.log(error)
                }
            })
  }

  calc_bar_height = () => {
    var party_votes = this.state.party_votes;
    var rock_votes = this.state.rock_votes;
    var break_votes = this.state.break_votes;
    var wedding_votes = this.state.wedding_votes;

    var total_votes = party_votes + rock_votes + break_votes + wedding_votes;
    var party_percentage = (party_votes / total_votes);
    var rock_percentage = (rock_votes / total_votes);
    var break_percentage = (break_votes / total_votes);
    var wedding_percentage = (wedding_votes / total_votes);
    return [party_percentage*100+"%", rock_percentage*100+"%", break_percentage*100+"%", wedding_percentage*100+"%"];
  
  }

  render() {

    console.log(this.calc_bar_height());
    const party_style = {
      position: "absolute",
      bottom: "0px",
      left: "50%",
      width: "15px",
      height: this.calc_bar_height()[0],
      backgroundColor: "purple",
      margin: "auto"
    }
    const rock_style = {
      width: "15px",
      position: "absolute",
      left: "50%",
      bottom: "0px",
      height: this.calc_bar_height()[1],
      backgroundColor: "yellow",
      margin: "auto"
    }
    const break_style = {
      width: "15px",
      position: "absolute",
      left: "50%",
      bottom: "0px",
      height: this.calc_bar_height()[2],
      backgroundColor: "black",
      margin: "auto"
    
    }
    const wedding_style = {
      width: "15px",
      position: "absolute",
      left: "50%",
      bottom: "0px",
      height: this.calc_bar_height()[3],
      backgroundColor: "green",
      margin: "auto"
    }

    const p_style={
      margin: 0 
    }

    const dialog_children = [
      <div style={{height: "150px"}}>
        <Row>
        <Col xs >
          <div style={{height: "100px", position: "relative"}}>
            <div style={party_style}>
            </div>
          </div>
            <p style={p_style}>Party </p>
        </Col>
        <Col xs>
          <div style={{height: "100px", position: "relative"}}>
            <div style={rock_style} >
            </div>
          </div>
            <p style={p_style} >Rock  </p>
        </Col>
        <Col xs>
          <div style={{height: "100px", position: "relative"}}>
            <div style={break_style} >
            </div>
          </div>
            <p style={p_style}>Break </p>
        </Col>
        <Col xs>
          <div style={{height: "100px", position: "relative"}}>
            <div style={wedding_style} >
            </div>
          </div>
            <p style={p_style}>Wedding</p>
        </Col>
        </Row>
      </div>
    ]

    const dialog_style= {
        width: "100%",
        height: "1600px",
        maxHeight: "1600px",
        maxWidth: "none"
    }

    const styles = {
        dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
      },
    };
    
    const button_style= {
        width: "100%",
        height: "100%",
        maxHeight: "none",
        maxWidth: "none"
    }

    const actions = [
      <RaisedButton
        id="stats_button"
        label="Close"
        labelStyle={button_style}
        style={button_style}
        onClick={this.props.cb}
      />
    ]
    return(
      <Dialog
        classes={{ paper: styles.dialogPaper}}
        open={this.props.show}
        children={dialog_children}
        title="Current voting status"
        style={dialog_style}
        contentStyle={dialog_style}
        bodyStyle={dialog_style}
        actions={actions}
      /> 
    )
  }

}
