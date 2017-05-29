
import React from 'react';

import {Grid, Row} from 'react-bootstrap';

import Topbar from './topbar';
import LoadingMask from './loadingmask';

import {changeText , changeName , makeRequest} from '../actions';

import { connect } from 'react-redux';

class MainContent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const { loading , onChangeText , onChangeName, doMakeRequest}
      = this.props;

    return(
      <Grid>
        <Row>
          <Topbar
            onChangeName={onChangeName}
            onChangeText={onChangeText}
            doMakeRequest={doMakeRequest}/>
          {this.props.children}
          <LoadingMask loading={loading}/>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  //get splitted state result and
  //bind this to props
  return {
    loading: state.makeRequest.loading
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
