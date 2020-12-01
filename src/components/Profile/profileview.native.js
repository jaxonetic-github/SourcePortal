import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileViewComponent from './profileviewComponent.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProfile,updateProfile, updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import {  NEED_AT_LEAST_ANONYMOUS_LOGIN, NO_PHOTO_AVAILABLE_URI} from '../../constants.js';


const mapStateToProps = state => {
const isConnected =  ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google"));
const profileIndex =  isConnected? state.auth.auth.userProfile.identities[0].id :null;
const profiles = state.profiles.profiles;

  return {
    profileIndex: profileIndex,
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),
     }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfile:updateProfile, updateProfileRequest:updateProfileRequest, addProfileRequest:addProfileRequest, addProfile:addProfile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileViewComponent)

