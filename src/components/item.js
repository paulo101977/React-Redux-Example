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
    const {item} = this.props;

    return (
        <Col md={12}>
          <Panel header={item? `Repository: ${item.name}` : ''}>

          </Panel>
        </Col>
      )}
}

function mapStateToProps(state) {

  console.log('item' , state)
  //get splitted state result and
  //bind this to props
  return {
    //text: state.changeText.text,
    //name: state.changeName.name,
    item: state.getItem.item
  };
}

function mapDispatchToProps() {
  return {

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

//module.exports = Container;
