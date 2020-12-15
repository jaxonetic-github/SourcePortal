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

import WebResourcesList from '../src/components/WebResources/webResourcesListComponent.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { PLACEHOLDER_SEARCH_TEXT , TEXT_DELETE} from '../src/constants.js'
//
import { render, fireEvent } from '@testing-library/react-native';

//import {AuthProvider} from '../src/services/realmApp.js';

const mockStore = configureStore([]);

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux store
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware) );
 

 describe('WebResourcesList', () => {


it('WebResourcesList renders correctly, (no redux store)', () => {
    const compData = initialStoreState.resourcesData.webResources;
    const {getByPlaceholderText, queryAllByText, getByText,findByText } = render(<WebResourcesList   webResources={compData} />);

 	//const searchField = getByPlaceholderText(PLACEHOLDER_SEARCH_TEXT);
 	compData.forEach((record)=>getByText(record.title));

/*
//ensure the three tab headers display
getByText("Media Outlets");
getByText("Our Master Teachers");
getByText("Roads to the Community");

const viewButtons =  queryAllByText("View");

*/
});



});
