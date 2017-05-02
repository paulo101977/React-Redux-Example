import React from 'react';

//import { connect } from 'react-redux'
//import { changeText } from '../actions'

class Topbar extends React.Component {

  constructor(props){
    super(props);

    console.log(this.props)
  }

  renderChildren(){
    const children = [];
    let i;
    for(i=0; i< 10; i++) children.push('Child' + i);
    return (
      children.map((text , index)=>{
          let input = {};
          input.text = text;
          return <button key={index} onClick={ ()=> { this.props.onChangeText(input.text)}}>
                  {text}
                </button>
        }
      )
    )
  }

  render(){
    return (
        <div className="fixed">
          {this.renderChildren()}
        </div>
      )
    }
  }

  //Topbar = connect()(Topbar);

  module.exports = Topbar;
