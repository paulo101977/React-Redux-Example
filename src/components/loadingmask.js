import React from 'react';
import ReactDOM from 'react-dom';


import {TimelineMax,Power2} from 'gsap';

//const imageSrc = require('../images/images.png');


class LoadingMask extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    //console.log(gsap)
    //const t = TweenMax({repeat: -1, yoyo: true});

  }

  startAnimation(){
    const t = new TimelineMax({repeat:-1, yoyo:true});

    const up = ReactDOM.findDOMNode(this.refs.up);
    const right = ReactDOM.findDOMNode(this.refs.right)
    const left = ReactDOM.findDOMNode(this.refs.left);
    const down = ReactDOM.findDOMNode(this.refs.down);

    t.to(up, .1 , {y: '-120%' , ease: Power2.easeOut})
    t.to(right, .1 , {x: '120%' , ease: Power2.easeOut})
    t.to(left, .1 , {x: '-120%', ease: Power2.easeOut})
    t.to(down, .1 , {y: '120%', ease: Power2.easeOut})
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.loading){
      this.startAnimation.bind(this);
    }

  }


  render(){

    //const loading = this.props.loading ? 'active' : '';
    const loading = "active"

    return(
      <div className={`loading-mask ${loading}`}>
        Loading
        {/*<img src={imageSrc}/>*/}
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
