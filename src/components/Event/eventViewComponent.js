import React, { Component } from 'react';
import { StyleSheet,Image,View,TextInput} from 'react-native';
import { Container, Button,Separator,Thumbnail, Header, Content, ListItem,
 Text, Icon, Title, Left, Body, Right,Accordion,Item } from 'native-base';
//import { connect } from 'react-redux';
//import {  addEventsToLocal,addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
//import { bindActionCreators } from 'redux';
import {UPDATE_EVENT_NAME_BY_KEY,UPDATE_EVENT_DESC_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY,UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY,
       ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';
import {getDefaultEvent, iconManager,COMMON_ICON_STYLE_SILVER, COMMON_ICON_STYLE,
        ROUTE_SIMPLE_INPUT_VIEW,ROUTE_EVENT_CALENDAR,ROUTE_MAPVIEW,
        TEXT_WEBSITE,ICON_TAG_ARROW_RIGHT,ICON_TAG_LOCATION,ICON_TAG_CALENDAR,ICON_TAG_BACK,ICON_TAG_ADD_CIRCLE,
        ICON_TAG_CREATE, ICON_TAG_REMOVE_CIRCLE, ICON_TAG_PHONE,ICON_TAG_MAIL,ICON_TAG_GLOBE,ICON_TAG_DESCRIPTION,ICON_TAG_PERSON,
        ICON_IOS_PERSON, ICON_ANDROID_PERSON,TEXT_SAVE,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,ICON_ALL_ARROWFORWARD,
        ICON_IOS_MAIL, ICON_ANDROID_MAIL,TEXT_MAIL,ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
        TEXT_PHONE,TRANSPARENT_COLOR, ICON_IOS_GLOBE, ICON_ANDROID_GLOBE,ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION, TEXT_DESCRIPTION,
        ICON_IOS_LOCATION, ICON_ANDROID_LOCATION, ICON_IOS_CALENDAR,ICON_ANDROID_CALENDAR,
        TEXT_NAME,COMMON_DARK_BACKGROUND,ICON_REMOVE_CIRCLE   } from '../../constants.js';
//import withRouter from '../../withRouterManager.js';

import moment from 'moment';

/**
*   ProfileView - The Screen to view and potentially edit a event. 
*    
*/
 class EventViewComponent extends Component {

  constructor(props) {
    super(props);
    let test;
    let evtId = this.props.route.params.eventID || null;
    const addEventRequest = this.props.addEventRequest || this.props.route.params.addEventRequest ;
    const addEventsToLocal = this.props.addEventsToLocal || this.props.route.params.addEventsToLocal ;
    const deleteEventRequest = this.props.deleteEventRequest || this.props.route.params.deleteEventRequest ;
    const updateEventRequest = this.props.updateEventRequest || this.props.route.params.updateEventRequest;
    const isNewEvent = this.props.isNewEvent || this.props.route.params.isNewEvent ;
    const evtObject = this.props.eventObj || this.props.route.params.eventObj ;
    // This Component assumes an ID in eventID property or from a route
    let update = (evtId != null);

    if(isNewEvent)
    {
      this.state = {dataIndex:evtObject.id, isNewEvent:true, eventObj:evtObject,  text: '', updateEventRequest:updateEventRequest, addEventRequest:addEventRequest};
    }else{  
        this.state = {dataIndex:evtObject.id, eventObj:evtObject,canUpdate:true, isNewEvent:false, text: '', updateEventRequest:updateEventRequest, addEventRequest:addEventRequest};
    }

     }

/**
 * Commit event data to backend
 */
  _saveEvent = () => {

    if( this.state.isNewEvent) {
            this.state.addEventRequest(this.state.eventObj);
            this.setState({isNewEvent:null})
    }
    else
       this.state.updateEventRequest(this.state.eventObj) 
  };

formatCalendarObject = (calendar) =>(calendar.year ? calendar.year+"-"+calendar.month+"-"+calendar.day : calendar);
displayCalendar = () =>this.formatCalendarObject(this.state.eventObj.calendar);

arrowIcon = ()=>this.props.isGoogleUser ? <Icon style={COMMON_ICON_STYLE}  name={ICON_ALL_ARROWFORWARD} /> : null;
  
  /**
  * 
  */
_renderContent = (item) =>
    (<View style={{flex:1, alignItems:"center",backgroundColor:"silver", borderRadius:10}}>
     <TextInput
        style={styles.input}
        value={item.displayText}
        onChangeText={(text)=>{
          const evtObject = this.state.eventObj;
          evtObject[item.key.toLowerCase()] = text;
          this.setState({eventObj:evtObject});}}/></View>)

/**
 * A header view to display the profile data when not in "Edit" mode
 */
    _renderHeader=(expanded,icon,iconsStyle,titleText,bodyText)=> 
            (<View key={titleText}  style={{flex:1,backgroundColor:"white"}}>
              <Item>
              {iconManager(icon,styles.iconStyle )}
            <Text style={{color:"silver"}}>{titleText}</Text>
            </Item>
            <Text style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"white"}}>{bodyText}</Text>
          </View>)
         //    {expanded ?
         //      iconManager(icon,{fontSize: 20, color: 'silver', flex:1, alignSelf:"flex-end"} ):
         //                iconManager(ICON_TAG_CREATE,{fontSize: 20, color: 'silver', position:"absolute", right:5, top:20} )
         // }
  render() {
  const eventData= [
    {key:TEXT_NAME,titleText:TEXT_NAME, icon:ICON_TAG_PERSON, icon_ios:ICON_IOS_PERSON,icon_droid:ICON_ANDROID_PERSON,
     updateAction:UPDATE_EVENT_NAME_BY_KEY, addAction:ADD_EVENT_NAME,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.eventObj.name, actionIcon:this.arrowIcon() },
    {key:TEXT_MAIL,titleText:TEXT_MAIL, icon:ICON_TAG_MAIL, icon_ios:ICON_IOS_MAIL,icon_droid:ICON_ANDROID_MAIL,
      updateAction:UPDATE_EVENT_EMAIL_BY_KEY, addAction:ADD_EVENT_EMAIL,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.eventObj.email, actionIcon:this.arrowIcon() },
    {key:TEXT_PHONE,titleText:TEXT_PHONE, icon:ICON_TAG_PHONE, icon_ios:ICON_IOS_PORTRAIT,icon_droid:ICON_ANDROID_PORTRAIT,
      updateAction:UPDATE_EVENT_PHONE_BY_KEY, addAction:ADD_EVENT_PHONE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.eventObj.phone, actionIcon:this.arrowIcon() },
    {key:TEXT_WEBSITE,titleText:TEXT_WEBSITE, icon:ICON_TAG_GLOBE,icon_ios:ICON_IOS_GLOBE,icon_droid:ICON_ANDROID_GLOBE,
           updateAction:UPDATE_EVENT_WEBSITE_BY_KEY, addAction:ADD_EVENT_WEBSITE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.eventObj.website, actionIcon:this.arrowIcon() },
    {key:TEXT_DESCRIPTION,titleText:TEXT_DESCRIPTION,icon:ICON_TAG_DESCRIPTION, icon_ios:ICON_IOS_DESCRIPTION,icon_droid:ICON_ANDROID_DESCRIPTION,
      updateAction:UPDATE_EVENT_DESC_BY_KEY, addAction:ADD_EVENT_DESC,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.eventObj.description, actionIcon:this.arrowIcon() }
      ];

 const items = eventData.map((record, index)=>{
    return (<Accordion  key={record.key}
                      style={{ paddingBottom:15, paddingTop:5}}
                  dataArray={[record]}
                  animation={true}
              renderContent={this._renderContent}
              renderHeader = {(item, expanded)=> {
          const title = item;
          //console.log(expanded, "\n--^^^^^^^^*******&&&&&&&&--\n", item);
            return (    
              this._renderHeader(expanded,item.icon, COMMON_ICON_STYLE, item.titleText, item.displayText, item.displayText,null )
            );
          }}/>);
 });

return (
      <Container style={styles.containerStyle}>       
        <Header  style={styles.headerStyle}>
          <Left><Button transparent></Button></Left>
          <Body><Title>Event {this.state.dataIndex}</Title></Body>
          <Right>             
            <Button transparent  onPress={() => this._saveEvent()} >
             {iconManager(ICON_TAG_ADD_CIRCLE, COMMON_ICON_STYLE)}
             <Text>{this.state.isNewEvent? TEXT_SAVE : "Updateee"}</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
        {items}
        <Separator bordered>
        <Text style={{flex:1,alignSelf:"center"}}>Time & Place</Text>
          </Separator>
  <ListItem style={{backgroundColor: "silver",marginLeft:0}}>
            <Left>
            {iconManager(ICON_TAG_LOCATION,COMMON_ICON_STYLE )}
              <Text>Location</Text>
            </Left>
            <Body>
              <Text>{this.state.eventObj.location}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Location" onPress={() => this.props.navigation.navigate("MapView",{key:this.state.dataIndex, initialLocation:this.state.eventObj.location})} >
                {iconManager(ICON_TAG_ARROW_RIGHT,COMMON_ICON_STYLE)}
                 </Button>
            </Right>
   </ListItem>
  <ListItem style={{backgroundColor: "white", marginLeft:0}}>
            <Left>
            {iconManager(ICON_TAG_CALENDAR,COMMON_ICON_STYLE )}
              <Text>Calendar</Text>
            </Left>
            <Body>
              <Text>{this.displayCalendar()}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Calendar" onPress={() => this.props.navigation.navigate("Calendar",{key:this.state.dataIndex, initialDate:this.displayCalendar() })} >
                  {iconManager(ICON_TAG_ARROW_RIGHT,COMMON_ICON_STYLE)}
                </Button>
            </Right>
          </ListItem>
          <ListItem style={{backgroundColor: "silver",marginLeft:0}}>
              <Left>
              <Text>Current Image</Text>
              </Left>
              <Body>
                <Thumbnail large square source={{ uri: this.props.imageURI}} />                
              </Body>
            <Right>
            </Right>
            </ListItem>
        </Content>
      </Container>
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
    iconStyle:COMMON_ICON_STYLE,
    containerStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
    headerStyle:{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"},
    
})


export default EventViewComponent;

