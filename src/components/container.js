import React from 'react';

class Container extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="scroll-container">
        {this.props.text}
    </div>
  )}
}





module.exports = Container;
