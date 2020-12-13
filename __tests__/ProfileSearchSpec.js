/* @jest-environment jsdom */

/**
 * @format
 */

//import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
/*
import { Root, Container } from "native-base";
import { SafeAreaView, } from "react-native";
*/

import { updateProfileRequest, addProfileRequest } from '../src/components/Profile/Redux/Actions/profile.js';

import { getDefaultProfile, TEXT_SAVE, PLACEHOLDER_SEARCH_TEXT,
 TEXT_UPDATE, TEXT_WEBSITE, TEXT_MAIL,TEXT_PHONE,TEXT_DESCRIPTION,  TEXT_NAME,
 TEXT_CURRENT_IMAGE,PROFILE, TEXT_CREATE_NEW} from '../src/constants.js';

import { UPDATE_PROFILE_DESC_BY_KEY, UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY,UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY,
        ADD_NAME, ADD_PROFILE, ADD_DESC,  ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../src/redux/types';

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

import createSagaMiddleware from 'redux-saga';

import { initialStoreState } from '../src/redux/state.js';

import ProfileSearch from '../src/components/Profile/profileSearchComponent.js';
import ProfileSearchRedux from '../src/components/Profile/profileSearch.js';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
// import { mount, shallow  } from 'enzyme';

//import {AuthProvider} from '../src/services/realmApp.js';


 describe('Profile Search Test ...', () => {


it('has a search input and a clickable CREATE NEW BUTTON', () => {
 const onPressUpdateProfile = jest.fn();
 const profileIndexToTest = 1; 
 const updateNameText = 'New Test name';
 const updateEmailText = 'New Test email';
 const updatePhoneText = 'New Test phone';
 const updateWebsiteText = 'New Test website';
 const updateDescriptionText = 'New Test description';
 const profile =  initialStoreState.profiles.profiles[profileIndexToTest];
 const {getByPlaceholderText, queryByPlaceholderText, getByText,getAllByText,getAllByTestId,getByDisplayValue, getAllByDisplayValue} = 
          render(<ProfileSearch profiles={initialStoreState.profiles.profiles} canAddProfile={true}/>);

//searchfield exists
 const searchField = getByPlaceholderText(PLACEHOLDER_SEARCH_TEXT);
 
 //add button shows
 const addButton = getByText(TEXT_CREATE_NEW);
 //fireEvent.changeText(searchField, profile.name.substring(0,3));

 //test user clicking the new button
 fireEvent.press(addButton);

    //  expect(onPressUpdateProfile).toHaveBeenCalledWith(profile);
 });




it('filters by changing text in search field, and shows clickable results', () => {
 const onPressUpdateProfile = jest.fn();
 const profileIndexToTest = 1; 
 const updateNameText = 'New Test name';
 const updateEmailText = 'New Test email';
 const updatePhoneText = 'New Test phone';
 const updateWebsiteText = 'New Test website';
 const updateDescriptionText = 'New Test description';
 //console.log("profile search test profiles::", initialStoreState.profiles.profiles)
 const profile =  initialStoreState.profiles.profiles[profileIndexToTest];
 const {getByPlaceholderText, queryByPlaceholderText, getByText,getAllByText,getAllByTestId,getByDisplayValue, getAllByDisplayValue} = 
          render(<ProfileSearch profiles={initialStoreState.profiles.profiles} canAddProfile={false}/>);
//searchfield exists
 const searchField = getByPlaceholderText(PLACEHOLDER_SEARCH_TEXT);

 getByText("Nami");
 fireEvent.changeText(searchField, profile.name.substring(0,3));

 //
 getByText(profile.name);
  //getByText("Nami")
 //add button shows
 //const addButton = getByText(TEXT_CREATE_NEW);
 //fireEvent.changeText(searchField, profile.name.substring(0,3));

 //test user clicking the new button
// fireEvent.press(addButton);

    //  expect(onPressUpdateProfile).toHaveBeenCalledWith(profile);
 });



});
