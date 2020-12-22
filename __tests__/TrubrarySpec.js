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

import Trubrary from '../src/components/Trubrary/trubraryComponent.js';

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
 

 describe('Trubrary', () => {


it('Trubrary renders correctly, (no redux store)', () => {
 	const videoData = initialStoreState.resourcesData.youTubeResources;

    const {getByPlaceholderText, queryAllByText, getByText,queryByText } = render(<Trubrary videoData={videoData} onlineMediaContent={initialStoreState.resourcesData.onlineMediaContent}   webResources={initialStoreState.resourcesData.webResources} />);

 	const searchField = getByPlaceholderText(PLACEHOLDER_SEARCH_TEXT);
 	for(let i = 0; i<7; i++)
 	{
 		getByText(videoData[i].title);
 	}
 	
//ensure the three tab headers display
getByText("Media Outlets");
getByText("Our Master Teachers");
getByText("Roads to the Community");

const viewButtons =  queryAllByText("View");
viewButtons.forEach((record)=> fireEvent.press(record));


fireEvent.changeText(searchField, "Wilson");
expect(queryByText("Sertima")).toBeNull();
//console.log("Trubrary viewbutton1::", viewButtons[0].props);
	  	//viewButtons.forEach((record)=> fireEvent.press(record));

});

it('Trubrary renders with redux and saga',()=>{


  <Provider store={store}>
   <Trubrary />
  </Provider>


});

});
