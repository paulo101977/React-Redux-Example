
import React from 'react';

import {Grid, Row} from 'react-bootstrap';

import Topbar from './topbar';
import LoadingMask from './loadingmask';

import {changeText , changeName , makeRequest , isLoading} from '../actions';

import { connect } from 'react-redux';

class MainContent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const { loading , onChangeText , onChangeName, doMakeRequest , setIsLoading } = this.props;

    return(
      <Grid>
        <Row>
          <Topbar
            onChangeName={onChangeName}
            onChangeText={onChangeText}
            setIsLoading={setIsLoading}
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
    loading: state.isLoading.loading
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
    },
    setIsLoading: (loading) =>{
      dispatch(isLoading(loading))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
