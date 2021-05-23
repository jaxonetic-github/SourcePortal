
import  {Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  GoogleCredential,
  CustomCredential,
  UserPasswordCredential }from 'mongodb-stitch-react-native-sdk';


import { call, put, fork } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import profilesReducer from '../src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from '../src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from '../src/components/Event/Redux/Reducers/eventReducer.js';

import ServicesManager from '../src/services/servicesManager'

import { insertProfile, rootSaga, actionWatcher} from '../src/redux/sagas/authSagas';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import DBService from '../src/services/servicesManager';
import 'isomorphic-fetch'; // --> https://github.com/facebook/react-native/issues/11537
import {
  LOGIN_USER_REQUEST, ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, REMOVE_LOCAL_PROFILE, DELETE_EVENT_SUCCESS,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE, ADD_EVENTS_TO_USEREVENTS, REMOVE_LOCAL_EVENT,
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS,
  ADD_PROFILE_TO_USERPROFILES,UPDATE_EVENT_SUCCESS,UPDATE_EVENT_FAILURE,UPDATE_PROFILE_SUCCESS
} from '../src/redux/types.js';
//import { googleAuthenticationPress } from '../src/redux/sagas/googleSaga';

import {
 REMOTE_RESOURCE_STRING, TIME_OUT, JEST_TIME_OUT, STATE, TYPES, getDefaultEvent, getDefaultProfile,
} from '../src/constants.js';
import {
   updateProfileRequest, addProfileRequest, addProfileSuccess, addProfile, deleteProfileRequest,fetchProfileRequest,
} from '../src/components/Profile/Redux/Actions/profile.js';

import { updateEventRequest, deleteEventRequest, addEventRequest, requestFetchEvent } from '../src/components/Event/Redux/Actions/eventActions.js';
import { loginUserRequest, dbClientInitialized, dbClientAlreadyInitialized } from '../src/components/Authentication/Redux/Actions/authActions.js';

import { cloneableGenerator } from '@redux-saga/testing-utils';


export const testInsertProfileAction = {
  type: ADD_PROFILE_SUCCESS,
  payload: STATE.initialStoreState.profiles.tmpProfile,
};


export const testEventAction = {
  type: 'TEST_Event',
  payload: STATE.initialStoreState.events.tmpEvent,
};

//const sagaMiddleware = createSagaMiddleware();
//sagaMiddleware.run(rootSaga, service);


  let failedToConnectOrAuthorize = false;
  var service ;
  //service.initialize(REMOTE_RESOURCE_STRING).then((result)=>expect(result).toBe(true))

  let authorizedUser = null;
  let profiles; let events; let dlt;

//await service.initialize();
  //service.initialize(REMOTE_RESOURCE_STRING);

  
   //   authorizedUser = await service.authorizeAnonymously();

describe('Integration tests between Sagas, and backend services (MongoStitch)', () => {


/**
 * Before all test, create a service object and attempt to login to Stitch. If
 * successful it should return a StitchUserImpl object(see mocks/StitchUserMock.js for an example)
 */
  beforeAll( async() => {
   service =  new ServicesManager();
//await service.initialize();
 const initResult = await  service.initialize(REMOTE_RESOURCE_STRING);

  //  console.log(initResult, "tes01 servmgr",service);


////await service.initialize();
 // service.initialize(REMOTE_RESOURCE_STRING)

  //console.log( "initial::", initResult)
  //console.log("iitnitial service::", service)
  });


it('0.  into DB', async () => {
 function *_actionWatcher(servicesManager) {}
 function *_fetchdata(servicesManager) {}

    const generatorFunc = rootSaga(service);//cloneableGenerator(rootSaga(service));
    const tst = generatorFunc.next();
    const fetchEvents  = generatorFunc.next();
    const fetchProfiles  = generatorFunc.next();
    const genFuncDone =  generatorFunc.next();
    expect(tst.value).toEqual(fork(actionWatcher, service));
    //console.log(service);
    //console.log(done,"<<<tst::>>>>",fetchProfiles);
    expect(fetchEvents.value).toEqual(put(requestFetchEvent()));
    expect(fetchProfiles.value).toEqual(put(fetchProfileRequest()));
    expect(genFuncDone.done).toBeTruthy();
});


it('1. inserts mock profile into DB', async () => {
    const auxprof = getDefaultProfile();
    auxprof.id = Math.floor(Math.random() * Math.floor(999999));
    console.log("test1 servmgr",service.stitchCrudServices);

    const failingProfile = {...auxprof};
    failingProfile.id = null;
    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[auxprof.id] = auxprof;
    const generatorFunc = insertProfile(service.stitchCrudServices, addProfileRequest(auxprof) );//cloneableGenerator(rootSaga(service));
    const insertYield = generatorFunc.next();
        const next = generatorFunc.next();
        const done = generatorFunc.next();
        const done2 = generatorFunc.next();
    console.log("generatorFunc::",generatorFunc);

    console.log("IS::",insertYield.value);
    console.log("next::",next.value);
    console.log("done::",done);
    console.log("done2::",done2);
    expect(done).toBeTruthy();

    //return expectSaga(insertProfile, service, addProfileRequest(auxprof) )
    //   .withReducer(profilesReducer, STATE.initialStoreState.profiles)
       //.dispatch(addProfileRequest(auxprof))

       //.call.actionType(ADD_PROFILE_SUCCESS)
    // assert that the saga will eventually yield `put`
    // with the expected action
    //.put.actionType( ADD_PROFILE_SUCCESS)
    //.call(service.stitchCrudServices.insertSingleProfile, addProfileRequest(auxprof).payload)

    //.put.actionType(ADD_PROFILE_FAILURE)
 //   .hasFinalState(finalState)
    //.run();
});
/*it('2. inserts mock event into DB', async () => {
    const auxEvent = getDefaultEvent();
  //  auxprof.id = Math.floor(Math.random() * Math.floor(999999));

    const finalState = STATE.initialStoreState;
    finalState.events.events[auxEvent.id] = auxEvent;

    expectSaga(rootSaga, service)
       .withReducer(eventsReducer, STATE.initialStoreState.events)
       .dispatch(addEventRequest(auxEvent))

    // assert that the saga will eventually yield `put`
    // with the expected action
   // .put.actionType( ADD_PROFILE_REQUEST)
    .put.actionType(ADD_EVENT_SUCCESS)
    //.hasFinalState(finalState)
    .run();
});



  it('3. inserts mock profile into DB and Deletes ', async () => {
    // get a copy of
    const prof = getDefaultProfile();
    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[prof.id] = prof;

      expectSaga(rootSaga, service)
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
      .run();
  });


  it('inserts mock event into DB and deletes Successfully',async () => {
    // get a copy of
    const evt = getDefaultEvent();

    const finalState = STATE.initialStoreState;
    finalState.events.events[evt.id] = evt;

     expectSaga(rootSaga, service)
    .withReducer(eventsReducer, STATE.initialStoreState.profiles)
    .provide({
        call(effect, next) {
        // Intercept API call to return fake value
          if (effect.fn === fetchEvents) {
            // console.log(effect);
            const testEvents = STATE.initialStoreState.events.events;
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
     .run();
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

     expectSaga(rootSaga, service)
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

   
     .hasFinalState(finalState)
     .run();

});

 it('updates mock event from DB ', async () => {
      if(!service.crud){
        console.log("Shouldn't really be here.********************>");
  await service.initialize(REMOTE_RESOURCE_STRING);
}


    const DBEvents = await service.crud.fetchEvents();
    const evt =  (DBEvents.length -3 >0) ? DBEvents[DBEvents.length-2] : DBEvents[0] ;

    const finalState = STATE.initialStoreState;
    finalState.events.events[evt.id] = evt;
   const testFailedEvent = evt;
   testFailedEvent.id = "NoID";
    evt.name = new Date().toString();
     expectSaga(actionWatcher, service)
    //.withReducer(eventsReducer, STATE.initialStoreState.profiles)
    /*.provide({
        call(effect, next) {
        // Intercept API call to return fake value
          if (effect.fn === fetchEvents) {
            // console.log(effect);
            const testEvents = STATE.initialStoreState.events.events;
            const id = effect.args[0];
            return testEvents;
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
      */
    // assert that the saga will eventually yield `put`
    // with the expected action
   // .dispatch(updateEventRequest(testFailedEvent))

     //.dispatch(updateEventRequest(testFailedEvent))
     //.put.actionType(UPDATE_EVENT_SUCCESS)
   // .put.actionType(UPDATE_EVENT_FAILURE)

    //.hasFinalState(finalState)
   //.run()
      //  .dispatch(updateEventRequest(testFailedEvent)).put.actionType(UPDATE_EVENT_SUCCESS);
//  });
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
 


/*
    afterAll(async () => {
  //jest.setTimeout(5000);
     await   service.logout();
     service=null;
     // setTimeout(function() {process.exit();}, 1200);
  });
*/
});
