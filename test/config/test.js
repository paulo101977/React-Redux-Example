
import * as actions from '../../src/actions';

import expectAsync from 'expect';

import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [ thunk ]
const mockStore = configMockStore(middlewares)

//to test react component
import { shallow } from 'enzyme';

import React from 'react'
import Topbar from '../../src/components/topbar';

//to test with actions/reducers
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';

describe('actions', ()=>{

  const data = {
    items:[
      { url: 'http://www.google.com' }
    ]
  }

  const expectedAction = {
    type: 'RECEIVE_MORE_DATA',
    data: data.items
  }

  const expectedErrorAction = {
    type: 'RECEIVE_MORE_DATA',
    data: data
  }

  it('should create a action', ()=>{
    expect(actions.receiveMoreData(data)).toEqual(expectedAction);
  })

  it('should false to expected action' , ()=>{
    expect(actions.receiveMoreData(data)).not.toEqual(expectedErrorAction)
  })



})

describe('actionsAsync', ()=>{

  beforeEach( ()=> {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  })

  afterEach( () => {
    nock.cleanAll();
  })

  it('should test count action' , (done) => {

    const store = mockStore({items: []})

    return store
      .dispatch(actions.makeRequest('node'))
      .then(()=>{
          expect(store.getActions().length).toEqual(3);
          done();
      })

  })
})

describe('componentTest' , () => {
  const setup = ()=>{
    const props = {
      makeRequest: jest.fn(),
      doMakeRequest: actions.makeRequest
    }

    const store = mockStore({items: {}})

    const enzymeWrapper = shallow(<Topbar {...props} />)

    return{
      store,
      enzymeWrapper,
      props
    }
  }

  it('should test if component is find' , ()=>{
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('Col').hasClass('col-md-12')).toBe(false)
  })

  it('should test if input component onChange set state' , ()=>{
    const { enzymeWrapper } = setup();

    let input = enzymeWrapper.find('FormControl');

    let event = {
      target: {
        value: 'react'
      }
    }

    //call onChange and then setRequestParameter
    input.props().onChange(event)
    expect(enzymeWrapper.state().requestText).toEqual('react')
  })

  it('should click on InputGroup.Button and get returned request' , ()=>{
    const {enzymeWrapper , props , store} = setup();

    let input = enzymeWrapper.find('FormControl');

    let button = enzymeWrapper.find('InputGroupButton');

    let eventFake = {
      target: {
        value: 'node'
      }
    }

    //call event onChange
    input.props().onChange(eventFake)

    //call event click
    //console.dir(props.makeRequest)
    button.simulate('click', props.makeRequest(enzymeWrapper));

    //TODO: make test below
    expect(enzymeWrapper.state().show).toEqual(false)
    expect(props.makeRequest.mock.calls.length).toEqual(1)
  })
})
