/**
*  TODO:  Documentation
*/
import {UPDATE_PROFILE, REMOVE_LOCAL_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, 
 ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE, DELETE_PROFILE_SUCCESS,DELETE_PROFILE_FAILURE,DELETE_PROFILE_REQUEST,
 ADD_PROFILE_TO_USERPROFILES, UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from '../../../../redux/types';

/*
 * action creators
 */
export function removeLocalProfile(id) {
  return { type: REMOVE_LOCAL_PROFILE, payload:id }
}

/**
* @param results: results from backend update
*/
export function updateProfileSuccess(results) {
  return { type: UPDATE_PROFILE_SUCCESS, payload:results }
}

export function updateProfileFailure(updatedEventError) {
  return { type: UPDATE_PROFILE_FAILURE, payload:updatedEventError }
}

export function updateProfileRequest(updatedProfile) {
  return { type: UPDATE_PROFILE_REQUEST, payload:updatedProfile }
}

export function updateProfile(updatedProfile) {
  return { type: UPDATE_PROFILE, payload:updatedProfile }
}

export function addProfile(profileObj) {
  return { type: ADD_PROFILE_TO_USERPROFILES, payload:profileObj }
}


export function fetchProfileRequest() {
 return {type: FETCH_PROFILE_REQUEST }
}
export function fetchProfileFailure(error) {
  return { type: FETCH_PROFILE_FAILURE, error: error }
}
export function fetchProfileSuccess(profiles) {
  return { type: FETCH_PROFILE_SUCCESS, payload: profiles }
}

/**
* @param Profileid is Profileid
*/
export function deleteProfileRequest(profileid) {
 return {type: DELETE_PROFILE_REQUEST,  payload:profileid}
}
export function deleteProfileFailure(error) {
  return { type: DELETE_PROFILE_FAILURE, payload: error }
}
export function deleteProfileSuccess(results) {
  return { type: DELETE_PROFILE_SUCCESS, payload: results }
}


export function addProfileRequest(profile) {
  console.log("addprofilerequest::", profile);
  return { type: ADD_PROFILE_REQUEST, payload:profile }
}
export function addProfileSuccess(profileSuccess) {
  return { type: ADD_PROFILE_SUCCESS, payload:profileSuccess }
}
export function addProfileFailure(err) {
  return { type: ADD_PROFILE_FAILURE, payload:err }
}
