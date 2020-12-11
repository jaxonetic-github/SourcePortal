/**
 * @format
 */

//import 'react-native';
import React from 'react';
/*
import { Root, Container } from "native-base";
import { SafeAreaView, } from "react-native";
*/
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

import EventSearchComponent from '../src/components/Event/EventSearch.native.js';
import EventViewRedux from '../src/components/Event/eventView.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { PLACEHOLDER_SEARCH_TEXT } from '../src/constants.js'
//
import { render, fireEvent } from '@testing-library/react-native';


/**
 *
 * 
 * 
 */
 describe('EventSearch', () => {

it('searches, finds and isolates matching text',async () => {
 const eventIndexToTest = 1;
 const eventIndex2ToTest = 2;
 const event = initialStoreState.events.events[eventIndexToTest];
 const event2 = initialStoreState.events.events[eventIndex2ToTest];
 const evtName = event.name;
 const {getByPlaceholderText, queryByText, getByText,findByText } = render(<EventSearchComponent  events={initialStoreState.events.events} canAddEvent={true} />);
 const searchField = getByPlaceholderText(PLACEHOLDER_SEARCH_TEXT);
 getByText(event.name);
 getByText(event2.name);
 //const jaxtext =  await findByText('Jax Event');
 fireEvent.changeText(searchField, event.name.substring(0,3));
 expect(queryByText(event2.name)).toBeNull();
 getByText(event.name);
});



});
