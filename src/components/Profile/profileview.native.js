import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileViewComponent from './profileviewComponent.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import {  NEED_AT_LEAST_ANONYMOUS_LOGIN, NO_PHOTO_AVAILABLE_URI} from '../../constants.js';


const mapStateToProps = state => {
const isConnected =  ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google"));
const profileIndex =  isConnected? state.auth.auth.userProfile.identities[0].id :null;
const profiles = state.profiles.profiles;

  return {
    profileIndex: profileIndex,
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),
    profiles: profiles,
    email: profileIndex && profiles[profileIndex] ? profiles[profileIndex].email : state.profiles.tmpProfile.email,
    name: profileIndex && profiles[profileIndex]  ? profiles[profileIndex].name : state.profiles.tmpProfile.name,
    phone: profileIndex && profiles[profileIndex] ? profiles[profileIndex].phone : state.profiles.tmpProfile.phone,
    website: profileIndex && profiles[profileIndex] ? profiles[profileIndex].website : state.profiles.tmpProfile.website,
    description: profileIndex && profiles[profileIndex] ? profiles[profileIndex].description : state.profiles.tmpProfile.description,
    imageURI: profileIndex && profiles[profileIndex] && profiles[profileIndex].imageURI !='' ? profiles[profileIndex].imageURI : NO_PHOTO_AVAILABLE_URI
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileRequest:updateProfileRequest, addProfileRequest:addProfileRequest}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileViewComponent)

