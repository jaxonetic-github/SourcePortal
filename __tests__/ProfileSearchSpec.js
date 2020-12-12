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
import SimpleInputEdit from '../src/components/simpleInputComponent.js';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
// import { mount, shallow  } from 'enzyme';
import configureStore from 'redux-mock-store';

//import {AuthProvider} from '../src/services/realmApp.js';

const mockStore = configureStore([]);

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux store
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware) );
 

 describe('Profile Search Test ...', () => {


it('Profile search', () => {
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


//console.log(wrapper);
//let component = mount(test); wrapper.setProps({ bar: 'foo' });
    //var test = React.createElement(() => <Profile  profileIndex={1} profiles={initialStoreState.profiles.profiles}  />);
  	//const Prof = <Profile  profileIndex={1} profiles={initialStoreState.profiles.profiles}  />;
/*
  it('renders the inner Counter', () => {

    let wrapper = shallow(<Profile  profileIndex={1} profiles={initialStoreState.profiles.profiles}  />);
console.log("text--",wrapper.text());
console.log("html",wrapper.state())
    const resp = wrapper.find(SimpleInputEdit).length;
console.log(wrapper , "---",resp, "---->");
    expect(resp).toEqual(1);
  });*/

/*
it('Profile renders with redux and saga',()=>{

  <Provider store={store}>
   <Profile />
  </Provider>

});
*/
});
