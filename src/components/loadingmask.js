import React from 'react';
import ReactDOM from 'react-dom';


import {TimelineMax} from 'gsap';

//const imageSrc = require('../images/images.png');


class LoadingMask extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    const t:TimelineMax = this.createAnimation(this);
    this.timeline = t;
  }

  //create new animation instance
  createAnimation(self){
    //infinite repeat with yoyo effect
    const t = new TimelineMax({repeat:-1, yoyo:true, paused: true});

    //animate this divs:
    const up = ReactDOM.findDOMNode(self.refs.up);
    const right = ReactDOM.findDOMNode(self.refs.right)
    const left = ReactDOM.findDOMNode(self.refs.left);
    const down = ReactDOM.findDOMNode(self.refs.down);

    //animate to...
    t.to(up, .1 , {y: '-120%'})
    t.to(right, .1 , {x: '120%'})
    t.to(left, .1 , {x: '-120%'})
    t.to(down, .1 , {y: '120%'})

    return t;
  }

  startAnimation(){
    //play this animation
    this.timeline.play();
  }

  componentWillReceiveProps(nextProps) {

    //console.log(nextProps)
    if(nextProps.loading && this.timeline){
      this.startAnimation();
    }

  }


  render(){

    const loading = this.props.loading ? 'active' : '';
    //const loading = "active"

    return(
      <div className={`loading-mask ${loading}`}>
        Loading...
        <div className="box-container">
          <div className="box" ref="up"></div>
          <div className="box" ref="right"></div>
          <div className="box" ref="down"></div>
          <div className="box" ref="left"></div>
        </div>
      </div>
    )
  }
}


export default LoadingMask;
