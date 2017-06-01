import React from 'react';

import {Col} from 'react-bootstrap';

import { connect } from 'react-redux';

import {loadMore} from './../actions';

//import {Link} from 'react-router';


import ErrorMessage from './ErrorMessage';

import ContainerItem from './containeritem';

export class Container extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: []
    }

    this.renderLoadMoreButton = this.renderLoadMoreButton.bind(this);
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

  loadMore(){

    let { page } = this.state;

    this.props.onLoadMore(this.props.toSearch , page);

    this.setState({page: page + 1})
  }

  renderLoadMoreButton(data){
      if(!data) return;

      if(Array.isArray(data) && data.length > 0){
        return(
          <button onClick={this.loadMore.bind(this)}
                  className="btn btn-default btn-block btn-load-more">Load more</button>
          );
      }
      else return;
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.toSearch != this.props.toSearch){
      this.setState({page: 2})
    }
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
    data: state.makeRequest.data,
    toSearch: state.makeRequest.text,
    //page: state.makeRequest.page
  };
}

//function mapDispatchToProps(dispatch) {
function mapDispatchToProps(dispatch) {

  //console.log()

  return {
    onLoadMore: (text , page)=>{
      dispatch(loadMore(text , page))
    }

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
