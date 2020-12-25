
import  {Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  GoogleCredential,
  CustomCredential,
  UserPasswordCredential }from 'mongodb-stitch-react-native-sdk';


import { call } from 'redux-saga/effects';
import { expectSaga, put } from 'redux-saga-test-plan';

import profilesReducer from '../src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from '../src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from '../src/components/Event/Redux/Reducers/eventReducer.js';

import ServicesManager from '../src/services/servicesManager'

import { rootSaga, actionWatcher} from '../src/redux/sagas/authSagas';
import DBService from '../src/services/servicesManager';
import 'isomorphic-fetch'; // --> https://github.com/facebook/react-native/issues/11537
import {
  ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, REMOVE_LOCAL_PROFILE, DELETE_EVENT_SUCCESS,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE, ADD_EVENTS_TO_USEREVENTS, REMOVE_LOCAL_EVENT,
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS,
  ADD_PROFILE_TO_USERPROFILES,UPDATE_EVENT_SUCCESS,UPDATE_PROFILE_SUCCESS
} from '../src/redux/types.js';
//import { googleAuthenticationPress } from '../src/redux/sagas/googleSaga';

import {
 REMOTE_RESOURCE_STRING, TIME_OUT, JEST_TIME_OUT, STATE, TYPES, getDefaultEvent, getDefaultProfile,
} from '../src/constants.js';
import {
   updateProfileRequest, fetchProfileRequest, addProfileRequest, addProfileSuccess, addProfile, deleteProfileRequest,
} from '../src/components/Profile/Redux/Actions/profile.js';

import { updateEventRequest, deleteEventRequest, addEventRequest } from '../src/components/Event/Redux/Actions/eventActions.js';


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
  const service =  new ServicesManager();
  let authorizedUser = null;
  let profiles; let events; let dlt;



   //   authorizedUser = await service.authorizeAnonymously();

describe('Integration tests between Sagas, and backend services (MongoStitch)',  () => {

  /**
 * Before all test, create a service object and attempt to login to Stitch. If
 * successful it should return a StitchUserImpl object(see mocks/StitchUserMock.js for an example)
 */
  it('Initializes', () => {

  service.initialize(REMOTE_RESOURCE_STRING).then((result)=>expect(result).toBe(true))

  //console.log( "initial::", tmp)
  console.log("iitnitial service::", service)

   



  });

it('1. inserts mock profile into DB', () => {
    const auxprof = getDefaultProfile();
  //  auxprof.id = Math.floor(Math.random() * Math.floor(999999));

    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[auxprof.id] = auxprof;

   expectSaga(rootSaga, service)
       .withReducer(profilesReducer, STATE.initialStoreState.profiles)
       .dispatch(addProfileRequest(auxprof))

    // assert that the saga will eventually yield `put`
    // with the expected action
   // .put.actionType( ADD_PROFILE_REQUEST)
    .put.actionType(ADD_PROFILE_SUCCESS)
    .hasFinalState(finalState)
    .run(TIME_OUT);
});
it('2. inserts mock event into DB', () => {
    const auxEvent = getDefaultEvent();
  //  auxprof.id = Math.floor(Math.random() * Math.floor(999999));

    const finalState = STATE.initialStoreState;
    finalState.events.events[auxEvent.id] = auxEvent;

   expectSaga(actionWatcher, service)
       .withReducer(eventsReducer, STATE.initialStoreState.events)
       .dispatch(addEventRequest(auxEvent))

    // assert that the saga will eventually yield `put`
    // with the expected action
   // .put.actionType( ADD_PROFILE_REQUEST)
    .put.actionType(ADD_EVENT_SUCCESS)
    //.hasFinalState(finalState)
    .run(TIME_OUT);
});



  it('3. inserts mock profile into DB and Deletes ', () => {
    // get a copy of
    const prof = getDefaultProfile();
    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[prof.id] = prof;

     expectSaga(actionWatcher, service)
     .withReducer(profilesReducer, STATE.initialStoreState.profiles)
      .provide({
       call(effect, next) {
          //   console.log(effect.fn,"-",failedToConnectOrAuthorize);
        // Intercept API call to return fake value
          if (effect.fn === fetchProfiles) {
           if(failedToConnectOrAuthorize)
           {

            console.log("mocking",effect.fn);
            const testProfiles = STATE.initialStoreState.profiles.profiles;
            const id = effect.args[0];
            return testProfiles;

            }
          }
          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
      .dispatch(addProfileRequest(prof))

    // assert that the saga will eventually yield `put`
    // with the expected action
      .put.actionType(ADD_PROFILE_SUCCESS)
  
     .dispatch(deleteProfileRequest( prof.id ))
      .put.actionType(DELETE_PROFILE_SUCCESS)
    // .hasFinalState(finalState)
      .run(TIME_OUT);
  });


  it('inserts mock event into DB and deletes Successfully', () => {
    // get a copy of
    const evt = getDefaultEvent();

    const finalState = STATE.initialStoreState;
    finalState.events.events[evt.id] = evt;

     expectSaga(actionWatcher, service)
    .withReducer(profilesReducer, STATE.initialStoreState.profiles)
    .provide({
        call(effect, next) {
        // Intercept API call to return fake value
          if (effect.fn === fetchEvents) {
            // console.log(effect);
            const testProfiles = STATE.initialStoreState.events.events;
            const id = effect.args[0];
            return testEvents;
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
     .dispatch(addEventRequest(evt))
    // assert that the saga will eventually yield `put`
    // with the expected action
      .put.actionType(ADD_EVENT_SUCCESS)

     
     .dispatch(deleteEventRequest({ id: evt.id }))
     .put.actionType(DELETE_EVENT_SUCCESS)

    // .hasFinalState(finalState)
      .run(TIME_OUT);
  });

it('updates a profile in the DB', async () => {
  // get a copy of
    if(!service.crud)
  await service.initialize(REMOTE_RESOURCE_STRING);

  
    const dbProfs = await service.crud.fetchProfiles();

    const prof =  (dbProfs.length -3 >0) ? dbProfs[dbProfs.length-2] : dbProfs[0] ;
    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[prof.id] = prof;
    
    prof.name = new Date().toString();

     expectSaga(actionWatcher, service)
     .withReducer(profilesReducer, STATE.initialStoreState.profiles)
      .provide({
       call(effect, next) {
          //   console.log(effect.fn,"-",failedToConnectOrAuthorize);
        // Intercept API call to return fake value
          if (effect.fn === fetchProfiles) {
           if(failedToConnectOrAuthorize)
           {

            console.log("mocking",effect.fn);
            const testProfiles = STATE.initialStoreState.profiles.profiles;
            const id = effect.args[0];
            return testProfiles;
            }
          }
          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })

    // assert that the saga will eventually yield `put`
    // with the expected action
     // .put.actionType(ADD_PROFILE_SUCCESS)
  
      .dispatch(updateProfileRequest(prof))
      .put.actionType(UPDATE_PROFILE_SUCCESS)

   
    // .hasFinalState(finalState)
      .run(TIME_OUT);

});
/*
 it('updates mock event from DB ', async () => {
      if(!service.crud)
  await service.initialize(REMOTE_RESOURCE_STRING);

    const DBEvents = await service.crud.fetchEvents();
    const evt =  (DBEvents.length -3 >0) ? DBEvents[DBEvents.length-2] : DBEvents[0] ;

    const finalState = STATE.initialStoreState;
    finalState.events.events[evt.id] = evt;
   
    evt.name = new Date().toString();
    return expectSaga(actionWatcher, service)
    .withReducer(profilesReducer, STATE.initialStoreState.profiles)
    .provide({
        call(effect, next) {
        // Intercept API call to return fake value
          if (effect.fn === fetchEvents) {
            // console.log(effect);
            const testProfiles = STATE.initialStoreState.events.events;
            const id = effect.args[0];
            return testEvents;
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
    // assert that the saga will eventually yield `put`
    // with the expected action

     .dispatch(updateEventRequest({ id: evt.id }))
     .put.actionType(UPDATE_EVENT_SUCCESS)
    

    // .hasFinalState(finalState)
     .run() 
  });
/*
  it('fetches events', async () => expectSaga(fetchEvents, service)
    // assert that the saga will eventually yield `put`
    // with the expected action
  // .returns({ hello: 'world' })
    .put({ type: FETCH_EVENT_SUCCESS })
  // .put.actionType(ADD_EVENTS_TO_USEREVENTS)

    .run(TIME_OUT), 10000);

  it('fetches profiles', async () => expectSaga(fetchProfiles, service)
    // assert that the saga will eventually yield `put`
    // with the expected action
  // .returns({ hello: 'world' })
    .put({ type: FETCH_PROFILE_SUCCESS })
    .run(TIME_OUT), 10000);


*/
 



    afterAll(async () => {
  //jest.setTimeout(5000);
     await   service.logout();
     service=null;
     // setTimeout(function() {process.exit();}, 1200);
  });

});
