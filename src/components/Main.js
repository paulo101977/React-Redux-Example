require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Container from './container';
import Topbar from './topbar';

import { connect } from 'react-redux';
import {changeText , changeName} from '../actions';
//import { bindActionCreators } from 'redux';
//import { changeText} from '../actions';

class AppComponent extends React.Component {

  constructor(props){
    super(props);
  }


  render() {

    const { text , name , onChangeText , onChangeName} = this.props;


    return (
      <div className="">
        <Topbar
          onChangeName={onChangeName}
          onChangeText={onChangeText}>
        </Topbar>
        <Container
          text={text}
          name={name}>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {

  //get splitted state result and
  //bind this to props
  return {
    text: state.changeText.text,
    name: state.changeName.name
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
