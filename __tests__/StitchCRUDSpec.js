
import { call } from 'redux-saga/effects';
import { expectSaga, put } from 'redux-saga-test-plan';

import profilesReducer from '../src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from '../src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from '../src/components/Event/Redux/Reducers/eventReducer.js';


import {
  rootSaga, insertProfile, insertEvent, fetchProfiles, fetchEvents, actionWatcher,
} from '../src/redux/sagas/authSagas';
import DBService from '../src/services/servicesManager';
import 'isomorphic-fetch'; // --> https://github.com/facebook/react-native/issues/11537
import {
  ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, REMOVE_LOCAL_PROFILE, DELETE_EVENT_SUCCESS,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE, ADD_EVENTS_TO_USEREVENTS, REMOVE_LOCAL_EVENT,
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS,
  ADD_PROFILE_TO_USERPROFILES,
} from '../src/redux/types.js';
//import { googleAuthenticationPress } from '../src/redux/sagas/googleSaga';

import {
  TIME_OUT, JEST_TIME_OUT, STATE, TYPES, getDefaultEvent, getDefaultProfile,
} from '../src/constants.js';
import {
  fetchProfileRequest, addProfileRequest, addProfileSuccess, addProfile, deleteProfileRequest, updateProfileRequest
} from '../src/components/Profile/Redux/Actions/profile.js';

import { deleteEventRequest, addEventRequest } from '../src/components/Event/Redux/Actions/eventActions.js';


export const testInsertProfileAction = {
  type: ADD_PROFILE_SUCCESS,
  payload: STATE.initialStoreState.profiles.tmpProfile,
};


export const testEventAction = {
  type: 'TEST_Event',
  payload: STATE.initialStoreState.events.tmpEvent,
};

const successFunc = (user) => {
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^', user);
  authorizedUser = { ...user };
};
  let failedToConnectOrAuthorize = false;
  let service = null;
  let authorizedUser = null;
  let profiles; let events; let dlt;

describe('Integration tests between Sagas, and backend services (MongoStitch)', () => {

  /**
 * Before all test, create a service object and attempt to login to Stitch. If
 * successful it should return a StitchUserImpl object(see mocks/StitchUserMock.js for an example)
 */
  beforeAll(async () => {
  //jest.setTimeout(JEST_TIME_OUT);

    try {
      service = new DBService();
      const tmp = await service.initialize();
      console.log("CrudSpec tmp::", tmp);
      authorizedUser = await service.authorizeAnonymously();
      // expect(results.errorStack).toBeFalsy();

      console.log("authorizedUser in sage--",authorizedUser);
      expect(authorizedUser).toBeTruthy();
    } catch (error) {
      failedToConnectOrAuthorize = true;
      console.error(error);
    }
  });

    it('1. inserts a profile, ', async () => {
   // const results = await service.crud.fetchEvents();
    
    let newProfile =  getDefaultProfile();
        
    const iResults = await service.crud.insertSingleProfile(newProfile);
    expect (iResults.insertedId).toBeTruthy();
    
  });

    it('1.5 inserts an event, ', async () => {
   // const results = await service.crud.fetchEvents();
    
    let newEvent =  getDefaultEvent();
        
    const iResults = await service.crud.insertSingleEvent(newEvent);
    expect (iResults.insertedId).toBeTruthy();
    
  });

    it('1. fetches events, if any, from DB', async () => {
    const results = await service.crud.fetchEvents();

    expect(results.length).toBeGreaterThan(0);
  });

  it('2. fetches profiles, if any, from DB', async () => {
    const results = await service.crud.fetchProfiles();

    expect(results.length).toBeGreaterThan(0);
  });

    it('3. inserts, updates, deletes a profile, ', async () => {
   // const results = await service.crud.fetchEvents();
    
    let newProfile =  getDefaultProfile();
        
    const iResults = await service.crud.insertSingleProfile(newProfile);
    expect (iResults.insertedId).toBeTruthy();

    newProfile.name = (new Date()).toString();

    const upDResults = await service.crud.updateSingleProfile(updateProfileRequest(newProfile));

    expect(upDResults.modifiedCount).toBe(1)
    const dresults = await service.crud.deleteProfile({id: newProfile.id});

    expect(dresults.deletedCount).toBe(1);
  });

    it('3.5 inserts, updates, deletes an event, ', async () => {
   // const results = await service.crud.fetchEvents();
    
    let newEvent =  getDefaultEvent();
        
    const iResults = await service.crud.insertSingleEvent(newEvent);
    expect (iResults.insertedId).toBeTruthy();
    //console.log("insert results",dResults);

    newEvent.name = (new Date()).toString();

    const upDResults = await service.crud.updateSingleEvent(newEvent);
    //console.log("3.results", upDResults)
    expect(upDResults.modifiedCount).toBe(1)
    const dresults = await service.crud.deleteEvent({id: newEvent.id});
    //console.log("3. final-->", fresults);
    expect(dresults.deletedCount).toBe(1);
  });
  
    it('5. fetches events, if any, from DB and updates', async () => {
    const results = await service.crud.fetchEvents();
    let eventToUpdate = (results && results.length>0) ? results[0] :  null;
    
    //console.log("eventToUpdate::=", eventToUpdate);
    eventToUpdate = eventToUpdate ? eventToUpdate : getDefaultEvent();

    eventToUpdate.email = (new Date()).toString();
    
    const upDResults = await service.crud.updateSingleEvent(eventToUpdate);

    expect(upDResults.modifiedCount).toBe(1);
  });


  
    it('4. fetches events, if any, from DB and deletes', async () => {
    const results = await service.crud.fetchEvents();
    let eventToDelete = (results && results.length>0) ? results[0] :  null;

    if (eventToDelete)
    {//if there is an event to delete than delete it
      const dResults = await service.crud.deleteEvent({id: eventToDelete.id});
      //console.log("delete results",dResults);
      expect(dResults.deletedCount).toBe(1);
    }
  else {//else expect an empty result , results.length =0 
    expect(results.length).toBe(0)}
  });
    

    it('logs out', async () => {
      const userAfterLogout = await service.logout();
      expect(userAfterLogout).toBeFalsy();
  });
    
  afterAll(async () => {
     //jest.setTimeout(JEST_TIME_OUT);
     //service.logout();
     // setTimeout(function() {process.exit();}, 1200);
  }); 

});
