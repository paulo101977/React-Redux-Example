import React from 'react';

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
      return(<div>{item.name}</div>)
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
      <div className="scroll-container">
        Text: {this.props.text}
        <br/>
        Name: {this.props.name}
        <br/>
        Response:
        <br/>
        {this.renderResponse(data)}
    </div>
  )}
}

module.exports = Container;
