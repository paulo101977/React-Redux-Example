import React from 'react';

import {Col} from 'react-bootstrap';

import { connect } from 'react-redux';

//import {Link} from 'react-router';

import {isLoading} from '../actions/index';


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

  componentWillReceiveProps(nextProps) {

    const {onIsLoading} = this.props;

    nextProps
      .request
      .then((response)=>{
        if(response.statusText === 'OK'){
          setTimeout(()=>{
            this.setState({data: response.data.items})

            this.setState({error: null})

            onIsLoading(false);
          }, 1000)

        }
      })
      .catch((error)=>{
        setTimeout(()=>{
          this.setState({error: error})
          onIsLoading(false);
        }, 1000)
      })
  }

  render(){
    const {data} = this.state;
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
        </Col>
      )}
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
  return {
    onIsLoading: (loading)=>{
      dispatch(isLoading(loading))
    }
  }
}

Container.defaultProps = {
  text: 'Child0',
  name: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

//module.exports = Container;
