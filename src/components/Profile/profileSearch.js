//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
import withRouter from '../../withRouterManager.js';

//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, TextInput} from 'react-native';
import { SwipeRow, Container, Header, Content, Title,  Thumbnail,Icon, Text,  Body, Right, Button } from 'native-base';
import {removeLocalProfile, deleteProfileRequest,fetchProfileRequest} from './Redux/Actions/profile.js'
import {COMMON_ICON_STYLE, COMMON_DARK_BACKGROUND,COMMON_ACTIVITY_INDICATOR, ACTIVE_TINT_COLOR, ROUTE_PROFILE_VIEW,
        COMMON_LISTVIEW_ITEM_SEPARATOR, GOOGLE_PROVIDER_NAME, ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI,
        TEXT_ADD_ARTIST,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,ICON_ALL_TRASH,EMPTY_STRING,TRANSPARENT_COLOR, PLACEHOLDER_SEARCH_TEXT,
        TEXT_DELETE, renderListView} from '../../constants.js'
import ProfileSearchComponent from './profileSearchComponent.js'

const mapStateToProps = state => {
  const profileKeys = Object.keys(state.profiles.profiles);
  const profiles = {};
  profileKeys.forEach(pkey => profiles[pkey]=state.profiles.profiles[pkey])
  return {
    canAddProfile :true,// (state.auth!==1) && (state.auth.auth.loggedInProviderName===GOOGLE_PROVIDER_NAME),
    profileIndex : (state.auth!==1) && (state.auth.auth.loggedInProviderName===GOOGLE_PROVIDER_NAME) ? state.auth.auth.userProfile.identities[0].id: 1,
    profileCount: profileKeys.length, 
    profiles: state.profiles.profiles
  }

}


function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchProfileRequest:fetchProfileRequest, deleteProfileRequest: deleteProfileRequest}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileSearchComponent)


