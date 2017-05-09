import React from 'react';

import {Thumbnail, Col , Panel, Button} from 'react-bootstrap';

import { connect } from 'react-redux';

class Item extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }

  }

  /*componentWillReceiveProps(nextProps) {

  }*/

  render(){
    const {data} = this.state;

    return (
        <Col md={12}>

        </Col>
      )}
}

function mapStateToProps(state) {

  //get splitted state result and
  //bind this to props
  return {
    //text: state.changeText.text,
    //name: state.changeName.name,
    //request: state.makeRequest.request
  };
}

function mapDispatchToProps(dispatch) {
  return {

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

//module.exports = Container;
