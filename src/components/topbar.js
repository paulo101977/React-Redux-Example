import React from 'react';

//import { connect } from 'react-redux'
//import { changeText } from '../actions'
import {Jumbotron , Col , FormControl , FormGroup , Button , InputGroup} from 'react-bootstrap';

class Topbar extends React.Component {

  constructor(props){
    super(props);

    this.setRequestParameter = this.setRequestParameter.bind(this);

    this.state = {
      requestText: ''
    }
  }

  makeRequest(){

    console.log('makeRequest')

    const {doMakeRequest , setIsLoading} = this.props;
    const {requestText} = this.state;

    setIsLoading(true);
    doMakeRequest(requestText);
  }

  setRequestParameter(text){
    this.setState({
      requestText: text
    })
  }

  render(){

    //const {doMakeRequest} = this.props;
    //const {requestText} = this.state;

    return (
        <Col md={12}>
          <Jumbotron>
            <form>
              <FormGroup>
                <InputGroup>
                  <FormControl onChange={(event)=>{this.setRequestParameter(event.target.value)}}>
                  </FormControl>
                  <InputGroup.Button
                    onClick={this.makeRequest.bind(this)}>
                      <Button bsStyle="primary">Send</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </Jumbotron>
        </Col>
      )
    }
  }

  module.exports = Topbar;
