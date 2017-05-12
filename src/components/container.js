import React from 'react';

import {Thumbnail, Col , Panel, Button} from 'react-bootstrap';

import { connect } from 'react-redux';

import {Link} from 'react-router';

import {isLoading , getItem} from '../actions/index';

import { browserHistory } from 'react-router';

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

  _handleClick(item){

    console.log('clicked')

    //prevent the click default
    //event.preventDefault();

    //dispatch the item to next component
    this.props.onGetItem(item);

    //push browser history (change route)
    browserHistory.push(`/item/${item.id}`);
  }

  renderResponse(data){
    if(!data) return (<div></div>);

    return data.map((item, index)=> {

      //console.log(item)

      return(
        <Col key={index} sm={4} md={4}>
          <Panel header="Repository Info:" bsStyle="default">
            <Thumbnail src={item.owner.avatar_url}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Button onClick={()=>this._handleClick(item)}
                  className="btn btn-default btn-block">Continuar</Button>
            </Thumbnail>
          </Panel>
        </Col>
      )
    });
  }

  componentWillReceiveProps(nextProps) {

    const {onIsLoading} = this.props;

    nextProps
      .request
      .then((response)=>{
        if(response.statusText === 'OK'){
          this.setState({data: response.data.items})

          setTimeout(()=>{
            onIsLoading(false);
          }, 1000)

        }
      })
      .catch((error)=>{
        this.setState({error: error})

        setTimeout(()=>{
          onIsLoading(false);
        }, 1000)
      })
  }

  render(){
    const {data} = this.state;

    return (
        <Col md={12}>
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
    },
    onGetItem: (item) =>{
      dispatch(getItem(item))
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
