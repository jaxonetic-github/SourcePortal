import React, {Component} from 'react';
import Input from './textinput.js';
import {
  Container,
  Header,
  Content,
  Item,
  Label,
  Textarea,
  Form,
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import {
  updateProfileDescByKey,
  updateProfileImageByKey,
  updateProfileEmailByKey,
  updateProfilePhoneByKey,
  updateProfileWebsiteByKey,
  updateProfileNameByKey,
  addProfileName,
  addProfileEmail,
  addProfilePhone,
  addProfileDescription,
  addProfileWebsite,
  addProfileImage,
} from './Profile/Redux/Actions/profile.js';
import {
  UPDATE_PROFILE_DESC_BY_KEY,
  UPDATE_PROFILE_IMAGE_BY_KEY,
  UPDATE_PROFILE_EMAIL_BY_KEY,
  UPDATE_PROFILE_PHONE_BY_KEY,
  UPDATE_PROFILE_WEBSITE_BY_KEY,
  UPDATE_PROFILE_NAME_BY_KEY,
  ADD_NAME,
  ADD_DESC,
  ADD_EMAIL,
  ADD_PHONE,
  ADD_WEBSITE,
  ADD_IMAGE,
  //event types
  UPDATE_EVENT_DESC_BY_KEY,
  UPDATE_EVENT_IMAGE_BY_KEY,
  UPDATE_EVENT_EMAIL_BY_KEY,
  UPDATE_EVENT_PHONE_BY_KEY,
  UPDATE_EVENT_WEBSITE_BY_KEY,
  UPDATE_EVENT_NAME_BY_KEY,
  ADD_EVENT,
  ADD_EVENT_NAME,
  ADD_EVENT_DESC,
  ADD_EVENT_EMAIL,
  ADD_EVENT_PHONE,
  ADD_EVENT_WEBSITE,
  ADD_EVENT_IMAGE,
} from '../redux/types';
import {
  updateEventDescByKey,
  updateEventImageByKey,
  updateEventEmailByKey,
  updateEventPhoneByKey,
  updateEventWebsiteByKey,
  updateEventNameByKey,
  addEventName,
  addEventEmail,
  addEventPhone,
  addEventDescription,
  addEventWebsite,
  addEventImage,
} from './Event/Redux/Actions/eventActions.js';
import SimpleInputEdit from './simpleInputComponent.js';

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateProfileDescByKey: updateProfileDescByKey,
      updateProfileImageByKey: updateProfileImageByKey,
      updateProfileEmailByKey: updateProfileEmailByKey,
      updateProfilePhoneByKey: updateProfilePhoneByKey,
      updateProfileWebsiteByKey: updateProfileWebsiteByKey,
      updateProfileNameByKey: updateProfileNameByKey,
      profileName: addProfileName,
      profileEmail: addProfileEmail,
      profileWebsite: addProfileWebsite,
      profilePhone: addProfilePhone,
      profileDescription: addProfilePhone,
      updateEventDescByKey: updateEventDescByKey,
      updateEventImageByKey: updateEventImageByKey,
      updateEventEmailByKey: updateEventEmailByKey,
      updateEventPhoneByKey: updateEventPhoneByKey,
      updateEventWebsiteByKey: updateEventWebsiteByKey,
      updateEventNameByKey: updateEventNameByKey,
      eventName: addEventName,
      eventEmail: addEventEmail,
      eventWebsite: addEventWebsite,
      eventPhone: addEventPhone,
      eventDescription: addEventPhone,
    },
    dispatch,
  );
}

export default withRouter(connect(null, matchDispatchToProps)(SimpleInputEdit));
