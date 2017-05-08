require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Container from './container';
import Topbar from './topbar';

import { connect } from 'react-redux';
import {changeText , changeName , makeRequest} from '../actions';
import {Grid , Row} from 'react-bootstrap';
//import { bindActionCreators } from 'redux';
//import { changeText} from '../actions';

class AppComponent extends React.Component {

  constructor(props){
    super(props);
  }


  render() {

    const { text , request, name , onChangeText , onChangeName, doMakeRequest} = this.props;


    return (
      <Grid className="">
        <Row>
          <Topbar
            onChangeName={onChangeName}
            onChangeText={onChangeText}
            doMakeRequest={doMakeRequest}>
          </Topbar>
          <Container
            text={text}
            name={name}
            request={request}>
          </Container>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {

  //get splitted state result and
  //bind this to props
  return {
    text: state.changeText.text,
    name: state.changeName.name,
    request: state.makeRequest.request
  };
}

function mapDispatchToProps(dispatch) {
  /*return {
    actions: bindActionCreators(changeText, dispatch)
  };*/
  return {
    //bind the actions to props
    onChangeText: (text) => {
      dispatch(changeText(text))
    },
    onChangeName: (text) => {
      dispatch(changeName(text))
    },
    doMakeRequest: (text) =>{
      dispatch(makeRequest(text))
    }
  }
}

AppComponent.defaultProps = {
  text: 'Child0',
  name: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

//export default AppComponent;
