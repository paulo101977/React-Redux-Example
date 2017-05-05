import React from 'react';

class Container extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="scroll-container">
        Text: {this.props.text}
        <br/>
        Name: {this.props.name}
    </div>
  )}
}

module.exports = Container;
