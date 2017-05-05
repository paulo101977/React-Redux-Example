import React from 'react';

//import { connect } from 'react-redux'
//import { changeText } from '../actions'

class Topbar extends React.Component {

  constructor(props){
    super(props);
  }

  renderChildren(){
    const children = [];
    const {onChangeText } = this.props;
    let i;
    for(i=0; i< 10; i++) children.push('Child' + i);
    return (
      children.map((text , index)=>{
          let input = {};
          input.text = text;
          return <button key={index} onClick={ ()=> { onChangeText(input.text)}}>
                  {text}
                </button>
        }
      )
    )
  }

  render(){

    const {onChangeName} = this.props;

    return (
        <div className="fixed">
          {this.renderChildren()}
          <br/>
          <input onChange={(event) => onChangeName(event.target.value)}></input>
        </div>
      )
    }
  }

  module.exports = Topbar;
