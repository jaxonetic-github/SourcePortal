//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import withRouter from '../../withRouterManager.js';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, TextInput,FlatList,Pressable} from 'react-native';
import { SwipeRow,Container, Header, Content,Title,Icon,
Picker, Thumbnail, Text, Body, Right, Button, Toast } from 'native-base';
import {deleteEventRequest, addEventsToLocal,addEventRequest} from './Redux/Actions/eventActions.js'
import {COMMON_ACTIVITY_INDICATOR, NO_PHOTO_AVAILABLE_URI, COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR,
ROUTE_EVENT_VIEW, TEXT_DELETE,EMPTY_STRING, TRANSPARENT_COLOR,ICON_ALL_TRASH, TEXT_NEW_EVENT,
GOOGLE_PROVIDER_NAME, LIST_SWIPELEFT_OPENVALUE, LIST_SWIPERIGHT_OPENVALUE, PLACEHOLDER_SEARCH_TEXT, TEXT_VIEW,
COMMON_LISTVIEW_ITEM_SEPARATOR,NEED_AT_LEAST_ANONYMOUS_LOGIN,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,
STATES,ICON_TAG_EDIT,COMMON_ICON_STYLE_MAROON, iconManager, getDefaultEvent } from '../../constants.js'
import CalendarView from '../calendarView';
import EventSearchAndResultsScreen from './eventSearch.native.js';

/**
 * Represents a component that allows a user to search for events.
 */
 
/*
 *    REDUX Specific
 */

const mapStateToProps = state => {
   const eventKeys = Object.keys(state.events.events);
  const isConnected =  ((state.auth!== NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName===GOOGLE_PROVIDER_NAME));
const isGoogleUser = (isConnected && state.auth.auth.userProfile.identities[0].id);
  
console.log("mapStateToProps OF EVENT SEARCH********=>");
  return {
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),
    events:state.events.events,
    canAddEvent : true, //(state.auth!==1) && (state.auth.auth.loggedInProviderName==={GOOGLE_PROVIDER_NAME}),

    eventCount: eventKeys.length, 

  }

}




function matchDispatchToProps(dispatch){
  return bindActionCreators({addEventRequest:addEventRequest,addEventsToLocal:addEventsToLocal, deleteEventRequest: deleteEventRequest}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(EventSearchAndResultsScreen)
//export default withRouter(connect(mapStateToProps,matchDispatchToProps )(EventSearchAndResultsScreen))





