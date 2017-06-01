
import React from 'react';
import ReactDOM from 'react-dom';

import {Thumbnail, Col , Panel, Button} from 'react-bootstrap';

import { browserHistory } from 'react-router';

import {TimelineMax} from 'gsap';

import { connect } from 'react-redux';

//import {Link} from 'react-router';

import {getItem} from '../actions/index';


export class ContainerItem extends React.Component {

  constructor(props){
  	super(props);
  	this.state = {};

  }

  componentDidMount() {
      const t = new TimelineMax({repeat:1,delay:0.2});

      //animate this divs:
      const item = ReactDOM.findDOMNode(this.refs.item);

      //animate to...
      t.to(item, .5 , {opacity: '1'})
  }

  _handleClick(item){

    //prevent the click default
    //event.preventDefault();

    //dispatch the item to next component
    this.props.onGetItem(item);

    //const url = item.html_url ? encodeURI(item.html_url) : '';

    //push browser history (change route)
    browserHistory.push(`/item/${item.id}`);
    //browserHistory.push(`/item/${url}`);
  }

  render(){
    const {item} = this.props;

    return(
      <Col className="with-opacity" ref="item" sm={4} md={4}>
        <Panel  bsStyle="default">
          <Thumbnail src={item.owner.avatar_url}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Button onClick={()=>this._handleClick(item)}
                className="btn btn-default btn-block">Continuar</Button>
          </Thumbnail>
        </Panel>
      </Col>
    )
  }

}

function mapStateToProps() {
  //get splitted state result and
  //bind this to props
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetItem: (item) =>{
      dispatch(getItem(item))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerItem);
