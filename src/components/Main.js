require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Container from './container';
import Topbar from './topbar';

import { connect } from 'react-redux';
import {changeText} from '../actions';
//import { bindActionCreators } from 'redux';
//import { changeText} from '../actions';

class AppComponent extends React.Component {

  constructor(props){
    super(props);
  }


  render() {

    const { text , onChangeText} = this.props;


    return (
      <div className="">
        <Topbar onChangeText={onChangeText}>
        </Topbar>
        <Container text={text}>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.text
  };
}

function mapDispatchToProps(dispatch) {
  /*return {
    actions: bindActionCreators(changeText, dispatch)
  };*/
  return {
    //bind the action to props
    onChangeText: (text) => {
      dispatch(changeText(text))
    }
  }
}

AppComponent.defaultProps = {
  text: 'Child0'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

//export default AppComponent;
