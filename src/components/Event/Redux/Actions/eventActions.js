
import {ADD_EVENT_LOCATION,REMOVE_LOCAL_EVENT, FETCH_EVENT_FAILURE, FETCH_EVENT_SUCCESS, FETCH_EVENT_REQUEST, DELETE_EVENT_REQUEST,UPDATE_EVENT_FAILURE,
ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE,DELETE_EVENT_SUCCESS,DELETE_EVENT_FAILURE, DELETE_PROFILE_REQUEST,
 ADD_EVENTS_TO_USEREVENTS, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE,UPDATE_EVENT_REQUEST,
UPDATE_EVENT_DESC_BY_KEY, UPDATE_EVENT_CALENDAR_BY_KEY, UPDATE_EVENT_LOCATION_BY_KEY, UPDATE_EVENT_NAME_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY, UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY, UPDATE_EVENT_IMAGE_BY_KEY,
FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, UPDATE_EVENT_SUCCESS} from '../../../../redux/types.js';

/*
 * action creators
 */
export function removeLocalEvent(id) {
  return { type:REMOVE_LOCAL_EVENT , payload:id }
}

export function addEventsToLocal(eventObjArray) {
  return { type: ADD_EVENTS_TO_USEREVENTS, payload:eventObjArray }
}

export function updateEventSuccess(results) {
  return { type: UPDATE_EVENT_SUCCESS, payload:results }
}
export function updateEventFailure(results) {
  return { type: UPDATE_EVENT_FAILURE, payload:results }
}
export function updateEventRequest(updatedEvent) {
  return { type: UPDATE_EVENT_REQUEST, payload:updatedEvent }
}
export function addEventRequest(newEvent) {
  return { type: ADD_EVENT_REQUEST, payload:newEvent }
}
/*
* successfully added and acknowledged from back end
*/
export function addEventSuccess(eventsFromDB) {
  return { type: ADD_EVENTS_TO_USEREVENTS, payload:eventsFromDB }
}
export function addEventFailure(err) {
  return { type: ADD_EVENT_FAILURE, payload:err }
}


export function deleteEventRequest(query) {
  return { type: DELETE_EVENT_REQUEST, payload:query }
}
export function deleteEventSuccess(results) {
  return { type: DELETE_EVENT_SUCCESS, payload:results }
}
export function deleteEventFailure(err) {
  return { type: DELETE_EVENT_FAILURE, payload:err }
}

export function requestFetchEvent() {
  return { type: FETCH_EVENT_REQUEST }
}
export function fetchEventSuccess(eventsFromDB) {
  return { type: FETCH_EVENT_SUCCESS, payload:eventsFromDB }
}
export function fetchEventFailure(err) {
  return { type: FETCH_EVENT_FAILURE, payload:err }
}
