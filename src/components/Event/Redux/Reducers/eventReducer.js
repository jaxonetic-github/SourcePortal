import {DELETE_EVENT_REQUEST, ADD_EVENT_REQUEST, UPDATE_EVENT_REQUEST, UPDATE_EVENT_CALENDAR_BY_KEY, UPDATE_EVENT_LOCATION_BY_KEY, UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY, UPDATE_EVENT_NAME_BY_KEY, REMOVE_LOCAL_EVENT, ADD_EVENTS_TO_USEREVENTS, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../../../redux/types';
import moment from 'moment';
import { initialStoreState } from '../../../../redux/state.js';

const eventStoreState = initialStoreState.events;
const eventStateSkeleton = { tmpEvent:{},  events:{} };
/**
 *  Redux Reducer for Event actions
 */
const eventReducer = (state=eventStateSkeleton, action) => {

  switch(action.type) {
   case ADD_EVENT_REQUEST:
    console.log('addnew event',action.payload);
    let stateEvts = {...state.events};

    stateEvts[action.payload.id] = action.payload;

    return { events:stateEvts };
    case UPDATE_EVENT_REQUEST:
    let stateEvents = {...state.events};  // {...state.events, ...action.payload};
    let tmpId     = action.payload.id;

    delete stateEvents[tmpId];

    stateEvents[tmpId] = action.payload;
    console.log("UPDATING EVENT");
    return {
              tmpEvent:{...state.tmpEvent },
                events: stateEvents
      };
    case ADD_EVENTS_TO_USEREVENTS:
    let newEvents = {};  // {...state.events, ...action.payload};
    let events = action.payload.forEach(filt=>{
              //if there are no events with the id, add the event
                  if (state.events && !state.events[filt.id]) {
                      newEvents[filt.id] = filt ; 
                    }
               });
    return {
              tmpEvent:{...state.tmpEvent },
                events:{...newEvents, ...state.events}
      };
    case DELETE_EVENT_REQUEST:
        let tmp = {...state.events};
        delete tmp[action.payload.id];
      return {
       tmpEvent:{...state.tmpEvent },
         events:tmp
      };      

    default:
      return state;
  }
}

export default eventReducer;
