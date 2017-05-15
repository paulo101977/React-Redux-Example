import React from 'react';

import {Alert} from 'react-bootstrap';


class ErrorMessage extends React.Component {

  constructor(props){
    super(props);


  }


  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message !== this.props.message;
  }



  render(){
    const {message} = this.props;

    return (

          <Alert bsStyle="danger">
            <span className="glyphicon glyphicon-alert"></span>&nbsp;
            <strong>Error:</strong> {message}
          </Alert>

      )}
}





export default ErrorMessage;
