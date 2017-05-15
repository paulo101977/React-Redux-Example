import React from 'react';

import {Thumbnail, Col , Panel, Button} from 'react-bootstrap';

import { connect } from 'react-redux';

//actions
import {isLoading , getItem , getRequestById} from '../actions/index';

class Item extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }

  }

  componentDidMount() {
    const {item} = this.props;

    //user refresh the browser
    if(!item){
      const {id} = this.props.params;

      //TODO: make request for id inside the github end-point
      this.props.onGetRequestById(id);
    }

  }

  doRequest(myProps, request, property){

    const {onIsLoading} = this.props;

    if(!myProps[request]) return;

    myProps[request]
    .then((response)=>{
      if(response.statusText === 'OK'){
        setTimeout(()=>{
          let state = {};
          state[property] = response.data;
          this.setState(state);


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

  componentWillReceiveProps(nextProps) {

    if(nextProps.request){
      this.doRequest(nextProps , 'request' , 'data')
    }

    if(nextProps.itemRequest){
      this.doRequest(nextProps , 'itemRequest' , 'itemData')
    }
  }

  renderBreadcrumb(){

  }

  renderResponse(data){
    if(!data) return (<div></div>);

    return data.map((item, index)=> {

      //console.log(item)

      return(
        <Col key={index} sm={4} md={4}>
            <a onClick={()=>this._handleClick(item)}
                className="btn btn-default btn-block">{item.name}</a>
        </Col>
      )
    });
  }

  render(){
    let {item} = this.props;
    item = item ? item : this.state.itemData;
    let {data} = this.state;

    data = data ? data.items : [];

    return (
        <Col md={12}>
          {
            item ?
            <Panel header={item? `Repository: ${item.name}` : ''}>
              <Col xs={12} md={6}>
                <Thumbnail alt={item.name} src={item.owner.avatar_url} />
              </Col>
              <Col xs={12} md={6}>
                <p>
                  <Col xs={4} md={3} className="without-padding-left">
                    <b>Name:</b>
                  </Col>
                  <Col xs={8} md={9} className="without-padding-left">
                    {item.name}
                  </Col>
                </p>
                <p>
                  <Col xs={12} md={3} className="without-padding-left">
                    <b>Description:</b>
                  </Col>
                  <Col xs={12} md={9} className="without-padding-left">
                    {item.description}
                  </Col>
                </p>
                <p>
                  <Col xs={4} md={3} className="without-padding-left">
                    <b>Url:</b>
                  </Col>
                  <Col xs={8} md={9} className="without-padding-left">
                    <a target="_blank" href={item.git_url}>{item.git_url}</a>
                  </Col>
                </p>
              </Col>
            </Panel>
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
    //text: state.changeText.text,
    request: state.makeRequest.request, //receive a promisse
    item: state.getItem.item,
    itemRequest: state.makeRequest.itemRequest //receive a promisse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIsLoading: (loading)=>{
      dispatch(isLoading(loading))
    },
    onGetItem: (item) =>{
      dispatch(getItem(item))
    },
    onGetRequestById : (id) =>{
      dispatch(getRequestById(id))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

//module.exports = Container;
