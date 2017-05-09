require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Container from './container';
import MainContent from './MainContent';
import Item from './item';

import { Router, Route , IndexRedirect , browserHistory} from 'react-router';


class AppComponent extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainContent}>
          <IndexRedirect to="/main" />
          <Route path="/main" component={Container} />
          <Route path="/item/:id" component={Item} />
        </Route>
      </Router>
    );
  }

}



export default AppComponent;

//export default AppComponent;
