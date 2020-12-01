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
import {TextInput, StyleSheet} from 'react-native';

/**
 *A custom html input textfield
 */
class SimpleInputEdit extends Component {
  constructor(props) {
    super(props);
    console.log('SimpleInput constructor', this.props);
    const inputType = this.props.inputType;
    const inputInitialValue = this.props.inputInitialValue || 'default';
    const key = this.props.profileIndex || null;

    this.state = {
      text: inputInitialValue,
      inputType: inputType,
      inputInitialValue: inputInitialValue,
      key: key,
      names: [],
    };
  }

  render() {
    return (
      <TextInput
        style={styles.input}
        value={this.state.text}
        onChangeText={(text) => this.setState({text: text})}
        onSubmitEditing={(editing) => {
          console.log('editing::', editing);
        }}
        placeHolder={this.state.inputType}
        onBlur={(blur) => console.log('onBlur')}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimpleInputEdit;
