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
        TEXT_CREATE_NEW,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,ICON_ALL_TRASH,EMPTY_STRING,TRANSPARENT_COLOR, PLACEHOLDER_SEARCH_TEXT,
        TEXT_DELETE, renderListView} from '../../constants.js'

/**
 * A List component with search abilities
 */ 
 class ProfileSearchComponent extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: EMPTY_STRING,   refreshing: false, profiles:this.props.profiles};
     }
/*
 _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchProfileRequest();
  }
*/
/**
 * Filter events based on what the user types in the search field
 * and updates the local state text
 * @Rreturn events with the text parameter in part of it's data fields
 */ 
  SearchFilterAndUpdateStateFunction(text) {
    //passing the inserted text from textinput to filter user's viewable events
    const newData = this.SearchFilterFunction(text)
    //update state and re-render the list accordingly
    this.setState({ text: text });
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @Rreturn events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {
   const keys = Object.keys(this.props.profiles)
 //console.log("profile search",keys.map(pkey => state.profiles[pkey]));
    const profiles = keys.map(pkey => this.props.profiles[pkey]);
    //passing the inserted text in textinput
    const newData = profiles.filter(function(item) {
     if (!item) 
      { 
        console.log('Todo: Log this (Undefined Profiles from DB)');
        return false;
      }
      //applying filter for the inserted text in search bar
      const name = item.name ? item.name.toUpperCase() : EMPTY_STRING.toUpperCase();
      const description = item.description ? item.description.toUpperCase() : EMPTY_STRING.toUpperCase();
      const phone = item.phone ? item.phone.toUpperCase() : EMPTY_STRING.toUpperCase();
      const website = item.website ? item.website.toUpperCase() : EMPTY_STRING.toUpperCase();
      const email = item.email ? item.email.toUpperCase() : EMPTY_STRING.toUpperCase();

      const textData = text.toUpperCase();

      return ((name.indexOf(textData) > -1)||(description.indexOf(textData) > -1) ||
        (phone.indexOf(textData) > -1)||(website.indexOf(textData) > -1)||(email.indexOf(textData) > -1));
    });

    return newData;
  }



 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>(item.id ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));



/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid={TRANSPARENT_COLOR}
          placeholder= {PLACEHOLDER_SEARCH_TEXT}
        />)


/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  */
  _renderItem = (profile) => (       
              <View  style={styles.outerViewStyle}>
              <Thumbnail source={{uri:profile.item.imageURI||NO_PHOTO_AVAILABLE_URI}}/>
              <Text style={{flex:1, alignSelf:"center"}}>{profile.item.name}</Text>
              <View style={{flex:1}}>
              <Button transparent  onPress={() =>this.props.navigation.navigate('Profile',{  profileIndex: profile.item.id,  profile:this.props.profiles[profile.item.id], role:profile.item.id} )} 
                                    style={{flex:1,alignSelf:"flex-end"}}>
                  <Text>{TEXT_VIEW}</Text>
                </Button>
                <Button transparent  onPress={() => this.props.deleteProfileRequest(profile.item.id)} style={{flex:1,alignSelf:"flex-end"}}>
                  <Text>Delete</Text>
                </Button>
                </View >
                </View>  
  );
      

/*
* duplicate code also found in profilesearch
*/
  addButton = ()=>{
    const _addButton = this.props.canAddProfile 
      ?  (<Button transparent  onPress={()=>this.props.navigation && this.props.navigation.navigate('Profile', { isNewProfile:true } )} >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={COMMON_ICON_STYLE}/>
               <Text style={styles.textStyle}>{TEXT_CREATE_NEW}</Text>
            </Button>)
      : null;
      return _addButton; }

/*
* Render component
*/
  render() {

    return (
      <Container style={styles.viewStyle}>
        <Header  style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.profileCount} Artists</Title>
            </Body>
            <Right>{this.addButton()}</Right>
        </Header>
        <Content>
        {renderListView(this._keyExtractor, this.renderSearchField,this._renderItem, this.SearchFilterFunction(this.state.text), COMMON_LISTVIEW_ITEM_SEPARATOR, styles.outerViewStyle, styles.title,ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI  )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
   title:{flex:1, alignSelf:"center"},
  innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  outerViewStyle:{ margin:0,padding:0, flexDirection: 'row',flex:1, justifyContent: 'center'},

  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  thumbnailStyle:{width:70 , height:70, borderRadius:15},
//innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  rightText:{alignSelf:"flex-end"},

  textStyle: {
    padding: 10, color:ACTIVE_TINT_COLOR
  },

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});




export default ProfileSearchComponent


