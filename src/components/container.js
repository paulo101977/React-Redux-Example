import React from 'react';

import {Grid , Row , Col , Panel} from 'react-bootstrap';

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
    if(!data) () => <div></div>;

    return data.map((item)=> {
      return(
        <Col md={4}>
          <Panel header="Repository Info:" bsStyle="default">
            {item.name}
          </Panel>
        </Col>
      )
    });
  }

  componentWillReceiveProps(nextProps) {
    nextProps
      .request
      .then((response)=>{
        if(response.statusText === 'OK'){
          this.setState({data: response.data.items})
        }
      })
      .catch((error)=>{
        this.setState({error: error})
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

module.exports = Container;
