/**
 * @format
 */

//import 'react-native';
import React from 'react';

import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { rootSaga } from '../src/redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';

import resourcesReducer from '../src/redux/resourcesReducer.js';
import videoRefsReducer from '../src/redux/videoRefsReducer.js';
import profilesReducer from '../src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from '../src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from '../src/components/Event/Redux/Reducers/eventReducer.js';
import sideBarReducer from '../src/redux/sideBarReducer.js';

import createSagaMiddleware from 'redux-saga'

import { initialStoreState } from '../src/redux/state.js';

import {  updateEventRequest, deleteEventRequest, addEventSuccess, addEventsToLocal, addEventRequest, requestFetchEvent } from '../src/components/Event/Redux/Actions/eventActions.js';
import {getDefaultEvent} from '../src/constants.js'
import Trubrary from '../src/components/Trubrary/trubraryComponent.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux store
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware) );

//console.log("store",store.getState().events); 

 describe('The Event Redux Reducer...', () => {
 
    it('fetches a list of events', () => {
      const initialState =[];
      const newState = eventsReducer(initialState, requestFetchEvent());
 
      expect(newState).toEqual(initialState);
    });

     it('it adds an event, empty store', () => {
      const initialState = {events:{} ,tmpEvent:{}};
      const newEvent = getDefaultEvent();
      const testNewState = {...initialState.events,  [newEvent.id]:newEvent};
      const expectedState = {events:testNewState, tmpEvent:initialState.tmpEvent} ;
      const newState = eventsReducer(initialState, addEventsToLocal([newEvent]));

      expect(newState).toEqual(expectedState);
    });


     it('adds 2 events with existing store', () => {
      const initialState = initialStoreState.events;
      const initialStateEventCount = Object.keys(initialState.events).length;
      const newEventOne = getDefaultEvent();
      const newEventTwo = getDefaultEvent();
      const testNewState = {...initialState.events,  [newEventOne.id]:newEventOne,  [newEventTwo.id]:newEventTwo};
      const expectedState = {events:testNewState, tmpEvent:initialState.tmpEvent} ;
      const newState = eventsReducer(initialState, addEventsToLocal([newEventTwo,newEventOne]));
     
      //expect 2 more events
      expect(initialStateEventCount+2).toEqual(Object.keys(expectedState.events).length);
      expect(newState).toEqual(expectedState);
    });

     it('it adds and updates an event', () => {
      const initialState = initialStoreState.events;
      const initialStateEventCount = Object.keys(initialState.events).length;
      const newEventOne = getDefaultEvent();
      const newEventTwo = getDefaultEvent();
      const newStateAfterEventAdd = {...initialState.events,  [newEventOne.id]:newEventOne};
     
      newEventOne.name = (new Date()).toString();
      newEventOne.email = (new Date()).toString()+"@testemail.com";
      const expectedState = {events:newStateAfterEventAdd, tmpEvent:initialState.tmpEvent} ;
      const newState = eventsReducer(initialState, updateEventRequest(newEventOne));
      //console.log("posts add", newState);
      //expect 2 more events
      //expect(initialStateEventCount+2).toEqual(Object.keys(expectedState.events).length);
      expect(newState.events[newEventOne.id].name).toEqual(newEventOne.name);
      expect(newState.events[newEventOne.id].email).toEqual(newEventOne.email);
    });

     it('removes an event with existing store', () => {
      const initialState = initialStoreState.events;
      const initialStateEventCount = Object.keys(initialState.events).length;
      const eventIdToBeRemoved = Object.keys(initialState.events)[0];
      const eventToRemove = initialState.events[eventIdToBeRemoved];
 		  let tmp = {...initialState.events};
      tmp = delete tmp[eventIdToBeRemoved];
      const testNewState =tmp; 
      const expectedState = {events:testNewState, tmpEvent:initialState.tmpEvent} ;
      const newState = eventsReducer(initialState, deleteEventRequest(eventIdToBeRemoved));
	//expect one less event
      expect(initialStateEventCount-1).toEqual(Object.keys(newState.events).length);
	//expect specific output
    });


  });
 
