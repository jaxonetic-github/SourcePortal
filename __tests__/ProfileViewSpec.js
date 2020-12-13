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

import { getDefaultProfile, TEXT_SAVE, 
 TEXT_UPDATE, TEXT_WEBSITE, TEXT_MAIL,TEXT_PHONE,TEXT_DESCRIPTION,  TEXT_NAME,
 TEXT_CURRENT_IMAGE,PROFILE} from '../src/constants.js';

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

import Profile from '../src/components/Profile/profileviewComponent.js';

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
 

 describe('Profile Component Test ...', () => {


it('it adds a profile fields', () => {
 const onPressAddProfile = jest.fn();
const onPressAddProfileRequest = jest.fn();

 const {getByText, getByTestId, getAllByText, getAllByRole, getAllByDisplayValue} = 
render(<Profile route={{params:{isNewProfile:true, addProfileRequest:onPressAddProfileRequest, addProfile:onPressAddProfile}}}  isNewProfile={true} addProfile={onPressAddProfile} addProfileRequest={onPressAddProfileRequest}/>);

const phoneInputValue = getByText("000-000-0000");

 //expecting 5 empty fields
 const emailInputValue = getByText("default@email.com");
 //expect(otherInputs).toHaveLength(5);

 //error thrown if no name field  found
 const nameField = getByText(TEXT_NAME);

 //error thrown if no save button found
 const addButton  = getByText(TEXT_SAVE);

 //test user clicking the update button
 fireEvent.press(addButton);

 expect(onPressAddProfile).toHaveBeenCalled();
});

it('Profile renders and "update" mechanism functions', () => {
 const onPressUpdateProfile = jest.fn();
 const profileIndexToTest = 1; 
 const updateNameText = 'New Test name';
 const updateEmailText = 'New Test email';
 const updatePhoneText = 'New Test phone';
 const updateWebsiteText = 'New Test website';
 const updateDescriptionText = 'New Test description';
 const profile =  initialStoreState.profiles.profiles[profileIndexToTest];
 const {getByPlaceholderText, queryByPlaceholderText, getByText,getAllByText,getAllByTestId, getAllByDisplayValue, getByA11yLabel} =  render(<Profile route={{params:{profileIndex:profileIndexToTest, profile:profile, updateProfile:onPressUpdateProfile}}}  updateProfile={onPressUpdateProfile}/>);


 //Ensuring initial field labels displays
 const nameFieldLabel = getByText(TEXT_NAME);
 const emailFieldLabel = getByText(TEXT_MAIL);
 const phoneFieldLabel = getByText(TEXT_PHONE);
 const websiteFieldLabel = getByText(TEXT_WEBSITE);
 const descFieldLabel = getByText(TEXT_DESCRIPTION);

// component  displays initial values before update 
 const nameField = getByText(profile.name);
 const emailField = getByText(profile.email);
 const phoneField = getByText(profile.phone);
 const websiteField = getByText(profile.website);
 const descField = getByText(profile.description);


 //test user clicking the  individual profile fields to expand and view the editable field.
 fireEvent.press(nameField);
 fireEvent.press(phoneField);
 fireEvent.press(emailField);
 fireEvent.press(websiteField);
 fireEvent.press(descField);

//grab all the inputs  that will be modified
  const nameInput = getByA11yLabel(TEXT_NAME);
  const emailInput = getByA11yLabel(TEXT_MAIL);
  const phoneInput =  getByA11yLabel(TEXT_PHONE);
  const websiteInput =  getByA11yLabel(TEXT_WEBSITE);
  const descInput =  getByA11yLabel(TEXT_DESCRIPTION);


  //fireEvent.changeText(answerInputs[0], 'a1');
  //fireEvent.changeText(answerInputs[1], 'a2');
//fireEvent.changeText(phoneInput, '2020-05-12' );

 fireEvent.changeText(nameInput, updateNameText);
 fireEvent.changeText(emailInput, updateEmailText);
 fireEvent.changeText(phoneInput, updatePhoneText);
 fireEvent.changeText(websiteInput, updateWebsiteText);
 fireEvent.changeText(descInput, updateDescriptionText);

 profile.email = updateEmailText;
 profile.name = updateNameText;
 profile.phone = updatePhoneText;
 profile.website = updateWebsiteText;
 profile.description = updateDescriptionText;

 //error thrown if no update button found
 const updateButton  = getByText(TEXT_UPDATE);

 //test user clicking the update button
 fireEvent.press(updateButton);

      expect(onPressUpdateProfile).toHaveBeenCalledWith(profile);

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
