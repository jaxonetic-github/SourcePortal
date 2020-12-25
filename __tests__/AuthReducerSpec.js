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
import{ googleSigninSuccess, googleSignOut, loginSucceeded,updateInternetConnectivity } from '../src/components/Authentication/Redux/Actions/authActions.js';
import {getDefaultProfile, NEED_AT_LEAST_ANONYMOUS_LOGIN} from '../src/constants.js'
import Trubrary from '../src/components/Trubrary/trubraryComponent.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);

//const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({ auth: authReducer });


//console.log("store",store.getState().profiles); 

 describe('Authentication Reducer', () => {
 
    it('should detect connection to the Internet', () => {
      const authState ={app:{}, auth:{}};
      const newAuthState = authReducer( undefined, updateInternetConnectivity(true));
 
      authState.app = {isConnectedToInternet: true};
      expect(newAuthState).toEqual(authState);
    });

     it('should add 1 profiles, empty store', () => {
      const initialState = {};
      const dbUserObject = {identities:["TestIdenties"]}
      const action =  loginSucceeded(dbUserObject);

      const expectedState = {
                  app: { ...initialState.app, registeredUser:(action.payload.identities?action.payload.identities[0].id: action.payload.identities[0].id) },
                  auth: loginSucceeded(dbUserObject).payload
              };
      const newState = authReducer(initialState, loginSucceeded(dbUserObject));

      expect(newState).toEqual(expectedState);
    });

    it('should detect connection to the Internet', () => {
      const authState ={app:{}, auth:{}};
      const newAuthState = authReducer( authState, googleSignOut());
 
      authState.auth = NEED_AT_LEAST_ANONYMOUS_LOGIN;
      expect(newAuthState).toEqual(authState);
    });

    it('should detect connection to the Internet', () => {
      const authState ={app:{}, auth:{}};
      const newAuthState = authReducer( authState, googleSigninSuccess({payload:{identities:[{id:55555}, {id:66666}]}}));
 
      authState.auth = {identities:[{id:55555}, {id:66666}]}
      expect(newAuthState).toEqual(authState);
    });
  });
 
