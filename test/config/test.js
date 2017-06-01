
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
import { Container } from '../../src/components/container';
import {ContainerItem} from '../../src/components/containeritem'

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

  it('should test count action and result' , (done) => {


    let items = [];

    for(var i = 0; i < 10; i++){
      let item = {
        name: 'name' + i,
        description: 'google.com',
        owner: {
          avatar_url: 'google.com/' + i
        }
      }

      items.push(item)
    }

    const fakeAction = [
      { type: 'REQUEST_DONE', loading: true },
      { type: 'RECEIVE_DATA',
        data: items,
        text: 'node',
        page: 1 },
      { type: 'REQUEST_DONE', loading: false }
    ]

    nock('https://api.github.com/')
      .get('/search/repositories?q=topic:node')
      .reply(200, { items: items })

    const store = mockStore()

    return store
      .dispatch(actions.makeRequest('node'))
      .then(()=>{
          //console.log(store.getActions())
          let actionsReceived = store.getActions();
          expect(actionsReceived.length).toEqual(3);
          expect(actionsReceived).toEqual(fakeAction);
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


    const enzymeWrapper = shallowWithStore(<Topbar {...props} />, store);
    //const enzymeWrapper = shallow(<Topbar {...props} />)

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

  it('should click on InputGroup.Button and check if callback set state' , ()=>{
    const {enzymeWrapper , props , store} = setup();

    //const component = shallowWithStore(enzymeWrapper, store);

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
    button.simulate('click', props.makeRequest());

    //store.dispatch()


    //TODO: make test below
    expect(enzymeWrapper.state().show).toEqual(false)
    expect(props.makeRequest.mock.calls.length).toEqual(1)

  })
})

describe('render container', ()=>{
  const setup = (data:Array)=>{


    const props = {
      data: data,
      onLoadMore: actions.loadMore,
      page: 2
    }

    const store = mockStore();

    const enzymeWrapper = shallowWithStore(<Container {...props}/>, store)

    return{
      props,
      store,
      enzymeWrapper
    }
  }

  const getFakeData = ()=>{
    let fakeData = [];

    for(var i = 0; i < 10; i++){
      let item = {
        name: 'name' + i,
        description: 'google.com',
        owner: {
          avatar_url: 'google.com/' + i
        }
      }

      fakeData.push(item)
    }

    return fakeData;
  }

  it('should render container without any item' , ()=>{

    const {enzymeWrapper} = setup([]);

    const wrapperObj = enzymeWrapper.find('Col');

    //const ContainerItem = enzymeWrapper.find('ContainerItem');

    expect(wrapperObj.length).toEqual(1);

    expect(enzymeWrapper.props().children[1].length).toEqual(0);
  })

  it('should render 10 itens', ()=>{
    let fakeData = getFakeData();

    const {enzymeWrapper} = setup(fakeData);

    const wrapperObj = enzymeWrapper.find('Col');


    expect(wrapperObj.length).toEqual(1);

    //test if have 10 child
    expect(enzymeWrapper.props().children[1].length).toEqual(10);
  })

  it('should render 10 itens and more 10 on click loadMore button', ()=>{
    let fakeData = getFakeData();

    const {enzymeWrapper} = setup(fakeData);

    const wrapperObj = enzymeWrapper.find('Col');

    const button = enzymeWrapper.find('button');

    expect(enzymeWrapper.state().page).toEqual(undefined)

    expect(wrapperObj.length).toEqual(1);

    expect(button.length).toEqual(1);

    //simulate receive props
    //enzymeWrapper.state().page = 2;
    //enzymeWrapper.setProps({page:2});
    enzymeWrapper.setProps({page:2});
    enzymeWrapper.update();

    console.log(enzymeWrapper.props())
    console.log(enzymeWrapper.state())

    button.simulate('click');


    //on click, set state to page + 1
    expect(enzymeWrapper.state().page).toEqual(3)
  })
})
