import React from 'react';

import {Row, Media, Thumbnail, Col , Panel, Breadcrumb} from 'react-bootstrap';

import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

//actions
import {isLoading , getItem , makeRequestById} from '../actions/index';

export class Item extends React.Component {

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
      this.props.onMakeRequestById(id);
    }

  }


  componentWillReceiveProps(nextProps) {


    if(nextProps.data){
      this.setState({data : nextProps.data})
    }

    if(nextProps.itemData){
      //this.doRequest(nextProps , 'itemRequest' , 'itemData')
      //console.log()
      this.setState({itemData: nextProps.itemData})
    }
  }

  renderBreadcrumb(item){
      const BreadcrumbItem = Breadcrumb.Item;
      return (
        <Breadcrumb>
          <BreadcrumbItem href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem target="_blank" href={item.owner.html_url}>
            Author
          </BreadcrumbItem>
          <BreadcrumbItem className="with-name" active>
            {item.name}
          </BreadcrumbItem>
        </Breadcrumb>
      )
  }

  _handleClick(item){

    this.props.onGetItem(item);

    browserHistory.push(`/item/${item.id}`);
  }

  renderResponse(data){
    if(!data) return (<div></div>);

    return data.map((item, index)=> {

      //console.log(item)

      return(
        <Col key={index} sm={4} md={4}>
          <Media>
            <Media.Left>
              <img width={64} height={64} src={item.owner.avatar_url}></img>
            </Media.Left>
            <Media.Body>
              <p><b>Description:</b></p>
              <p className="wrap-text">
                {item.description}
              </p>
              <button onClick={()=>this._handleClick(item)}
                  className="btn btn-default btn-block">{item.name}</button>
            </Media.Body>
          </Media>

        </Col>
      )
    });
  }

  render(){
    let {item} = this.props;
    item = item ? item : this.state.itemData;
    let {data} = this.state;

    data = data ? data : [];

    return (
        <Col md={12}>
          {item ? this.renderBreadcrumb(item) : <div></div>}
          {
            item ?
            <Panel header={item? `Repository: ${item.name}` : ''}>
              <Col xs={12} md={6}>
                <Thumbnail alt={item.name} src={item.owner.avatar_url} />
              </Col>
              <Col xs={12} md={6}>
                <div>
                  <Col xs={4} md={3} className="without-padding-left">
                    <b>Name:</b>
                  </Col>
                  <Col xs={8} md={9} className="without-padding-left">
                    {item.name}
                  </Col>
                </div>
                <div>
                  <Col xs={12} md={3} className="without-padding-left">
                    <b>Description:</b>
                  </Col>
                  <Col xs={12} md={9} className="without-padding-left">
                    {item.description}
                  </Col>
                </div>
                <div>
                  <Col xs={4} md={3} className="without-padding-left">
                    <b>Url:</b>
                  </Col>
                  <Col xs={8} md={9} className="without-padding-left">
                    <a target="_blank" href={item.git_url}>{item.git_url}</a>
                  </Col>
                </div>
              </Col>
            </Panel>
            :
            <div></div>
          }
          <Row>
            {this.renderResponse(data)}
          </Row>
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
    data: state.makeRequest.data,
    itemData: state.makeRequest.itemData //receive a promisse
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
    onMakeRequestById : (id) =>{
      dispatch(makeRequestById(id))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

//module.exports = Container;
