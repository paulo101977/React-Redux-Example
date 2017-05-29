import React from 'react';

//import { connect } from 'react-redux'
//import { changeText } from '../actions'
import {Jumbotron , Col , Overlay , Popover ,Form , FormControl , FormGroup , Button , InputGroup}
  from 'react-bootstrap';


import ReactDOM from 'react-dom';

class Topbar extends React.Component {

  constructor(props){
    super(props);

    this.setRequestParameter = this.setRequestParameter.bind(this);

    this.state = {
      requestText: ''
    }
  }

  componentDidMount() {
    const input = ReactDOM.findDOMNode(this.refs.input);

    this.setState({target: input})
  }

  makeRequest(){

    const {doMakeRequest } = this.props;
    const {requestText} = this.state;

    if(!requestText){
      this.setState({
        hasError: 'error',
        show: true
      })
      return;
    }

    this.setState({
      hasError: '',
      show: false
    })

    //setIsLoading(true);
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

    const hasError = this.state.hasError ? this.state.hasError : null;

    return (
        <Col md={12}>
          <Jumbotron>
            <Form>
              <FormGroup ref="input" validationState={hasError}>
                <InputGroup>

                    <Overlay
                      show={this.state.show}
                      target={this.state.target}
                      placement="bottom"
                      container={this.state.target}
                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <strong>Fill the form!</strong>
                      </Popover>
                    </Overlay>
                    <FormControl onChange={(event)=>{this.setRequestParameter(event.target.value)}}>
                    </FormControl>
                    <FormControl.Feedback />


                    <InputGroup.Button
                      onClick={this.makeRequest.bind(this)}>
                        <Button bsStyle="primary">Send</Button>
                    </InputGroup.Button>

                </InputGroup>
              </FormGroup>
            </Form>
          </Jumbotron>
        </Col>
      )
    }
  }

  module.exports = Topbar;
