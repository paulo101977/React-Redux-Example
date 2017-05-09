import React from 'react';

import {Thumbnail, Col , Panel, Button} from 'react-bootstrap';

import { connect } from 'react-redux';

import {Link} from 'react-router';

import {isLoading} from '../actions/index';

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
        <Col key={index} sm={4} md={4}>
          <Panel header="Repository Info:" bsStyle="default">
            <Thumbnail src={item.owner.avatar_url}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Link className="btn btn-default btn-block" to={`/item/${item.id}`}>Continuar</Link>
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

          onIsLoading(false);
        }
      })
      .catch((error)=>{
        this.setState({error: error})

        onIsLoading(false);
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
