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
import sideBarReducer from '../src/redux/sideBarReducer.js';

import createSagaMiddleware from 'redux-saga'

import { initialStoreState } from '../src/redux/state.js';

import {  fetchProfileRequest, removeLocalProfile, addProfileSuccess, addProfile, addProfileRequest } from '../src/components/Profile/Redux/Actions/profile.js';
import {getDefaultProfile} from '../src/constants.js'
import Trubrary from '../src/components/Trubrary/trubraryComponent.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);

//const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer,  auth: authReducer });


//console.log("store",store.getState().profiles); 

 describe('Profile Reducer', () => {
 
    it('should fetch list of profiles', () => {
      const initialState =[];
      const newState = profilesReducer(initialState, fetchProfileRequest());
 
      expect(newState).toEqual(initialState);
    });

     it('should add 1 profiles, empty store', () => {
      const initialState = {profiles:{} ,tmpProfile:{}};
      const newProfile = getDefaultProfile();
      const testNewState = {...initialState.profiles,  [newProfile.id]:newProfile};
      const expectedState = {profiles:testNewState, tmpProfile:initialState.tmpProfile} ;
      const newState = profilesReducer(initialState, addProfile(newProfile));

      expect(newState).toEqual(expectedState);
    });


     it('should add 2 profile with existing store', () => {
      const initialState = initialStoreState.profiles;
      const initialStateProfileCount = Object.keys(initialState.profiles).length;
      const newProfileOne = getDefaultProfile();
      const newProfileTwo = getDefaultProfile();
      const testNewProfilesState = {...initialState.profiles,  [newProfileOne.id]:newProfileOne,  [newProfileTwo.id]:newProfileTwo};
      const expectedState = {profiles:testNewProfilesState, tmpProfile:initialState.tmpProfile} ;
      const afterAddOneState = profilesReducer(initialState, addProfile(newProfileOne));
        const afterAddTwoState = profilesReducer(afterAddOneState, addProfile(newProfileTwo));

      //expect 2 more profiles
      expect(initialStateProfileCount+2).toEqual(Object.keys(afterAddTwoState.profiles).length);
      expect(afterAddTwoState).toEqual(expectedState);
    });

     it('should remove an profile with existing store', () => {
      const initialState = initialStoreState.profiles;
      const initialStateProfileCount = Object.keys(initialState.profiles).length;
      const profileToRemove = Object.keys(initialState.profiles)[0]
 		
      let tmp = {...initialState.profiles};
      delete tmp[profileToRemove];
      const testNewState =tmp; 
      const expectedState = {profiles:testNewState, tmpProfile:initialState.tmpProfile} ;

      const newState = profilesReducer(initialState, removeLocalProfile(initialState.profiles[profileToRemove]));
	
	//expect one less profile
      expect(initialStateProfileCount-1).toEqual(Object.keys(newState.profiles).length);
	//expect specific output
      expect(newState).toEqual(expectedState);
    });


  });
 
