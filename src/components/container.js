import React from 'react';

import {Col} from 'react-bootstrap';

import { connect } from 'react-redux';

//import {Link} from 'react-router';


import ErrorMessage from './ErrorMessage';

import ContainerItem from './containeritem';

class Container extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: []
    }

  }

  getInitialState() {
      return {
        data: [],
        error: null
      };
  }


  renderResponse(data){
    if(!data) return (<div></div>);

    return data.map((item, index)=> {

      //console.log(item)

      return(
        <ContainerItem key={index} item={item} />
      )
    });
  }

  renderLoadMoreButton(data){
      if(!data) return;

      if(Array.isArray(data) && data.length > 0){
        return(<button className="btn btn-default btn-block btn-load-more">Load more</button>);
      }
      else return;
  }

  render(){
    const {data} = this.props;
    const {error} = this.state;

    return (
        <Col md={12}>
          {
            error ?
              <ErrorMessage message={error.message}/>
              :
              <div></div>
          }
          {this.renderResponse(data)}
          {this.renderLoadMoreButton(data)}
        </Col>
      )}
}

function mapStateToProps(state) {

  //console.log('container data' ,state)

  //get splitted state result and
  //bind this to props
  return {
    text: state.changeText.text,
    name: state.changeName.name,
    request: state.makeRequest.request,
    data: state.makeRequest.data
  };
}

//function mapDispatchToProps(dispatch) {
function mapDispatchToProps() {

  //console.log()

  return {
    /*onIsLoading: (loading)=>{
      dispatch(isLoading(loading))
    }*/
  }
}

Container.defaultProps = {
  data: [],
  name: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

//module.exports = Container;
