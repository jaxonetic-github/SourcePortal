//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 


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

/**
 * Represents a component that allows a user to search for events.
 */
 class EventSearchAndResultsScreen extends Component {

  constructor(props) {
    super(props);
    //setting default state
    console.log(this.props.canAddEvent,"-----+++++++++++++----", this.props.route);
    const canAddEvent = this.props.canAddEvent || (this.props.route && this.props.route.params.canAddEvent);
    this.state = { canAddEvent:canAddEvent, isLoading: true, text: EMPTY_STRING, location:"All"};
  }

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

    return newData;
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @Rreturn events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {

   const formatCalendarObject = (calendar) =>{
      const aux = (calendar.year ? calendar.year+"-"+calendar.month+"-"+calendar.day : calendar)
      return aux;
    }

    //Object.keys( this.props.events).forEach(([key, value])=>{})
    //passing the inserted text in textinput
    const newData = Object.entries( this.props.events).map(function(itemArr) {
      const item = itemArr[1];
      //applying filter for the inserted text in search bar
      const name = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const description = item.description ? item.description.toUpperCase() : ''.toUpperCase();
      const phone = item.phone ? item.phone.toUpperCase() : ''.toUpperCase();
      const website = item.website ? item.website.toUpperCase() : ''.toUpperCase();
      const location = item.location ? item.location.toUpperCase() : ''.toUpperCase();
      const calendar = item.calendar ?formatCalendarObject( item.calendar): ''.toUpperCase();
      const email = item.email ? item.email.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
 //console.log(text,"::::ITem:::::",item.name);
      return ((location.indexOf(textData) > -1)||(calendar.indexOf(textData) > -1)||(name.indexOf(textData) > -1)||(description.indexOf(textData) > -1) ||
        (phone.indexOf(textData) > -1)||(website.indexOf(textData) > -1)||(email.indexOf(textData) > -1)) ? item:null ;
    });
  //  console.log("NEWDATA:::::",newData);
    return newData;
  }


 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>((item && item.id) ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));



  /* Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew = () =>  this.props.navigation.push("Event",{isNewEvent:true, eventObj:getDefaultEvent()});
  

/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {index, item, separators} item - item.item expectected to be [eventId, eventObject]
  */
_renderItem = (item) => {

 const formatCalendarObject = (calendar) =>(calendar.year ? calendar.year+"-"+calendar.month+"-"+calendar.day : calendar)
/** Navigate to event-creation screen  */
   _onPress = (itemId) => this.props.navigation.push('Event',{ eventIndex: itemId.id, eventObj: this.props.events[itemId.id] });

  return item.item ? 
              (<View style={styles.viewStyle}>
              <Thumbnail source={{uri:/*item.item.imageURI||*/NO_PHOTO_AVAILABLE_URI}}/>
              <View style={styles.innerViewStyle}>
                  <Title style={styles.rightText} >{item.item.name}</Title>
                  <Text style={styles.rightText} >{formatCalendarObject(item.item.calendar)}</Text>
                  <Text note numberOfLines={2}>{item.item.description}</Text>
              </View>
            <Button role={""} onPress={()=>_onPress(item.item)} ><Text >{TEXT_VIEW}</Text></Button>
            <Button role={""} onPress={()=>this.props.deleteEventRequest(item.item.id)}  ><Text >{TEXT_DELETE}</Text></Button>

              </View>) : <View></View> ;
}

/*
* 
*/
  addButton = ()=>{
    const _addButton = this.state.canAddEvent
      ?  (<Button transparent  onPress={()=>this._onPressNew()} >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={{fontSize: 20, color: INACTIVE_TINT_COLOR}}/>
               <Text style={styles.textStyle}>{TEXT_NEW_EVENT}</Text>
            </Button>)
      : null;
      return _addButton; }


  onLocationChange(value: string) {
    this.setState({
      location: value
    });
  }


/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid={TRANSPARENT_COLOR}
          placeholder={PLACEHOLDER_SEARCH_TEXT}
        />)

/** React Render **/
  render() { 
    const locations = ()=>Object.entries( this.props.events).map((event)=><Picker.Item key={event[1].id} label={event[1].location} value={event[1].location} />)
    
    const states = STATES.states.map((event)=>(<Picker.Item key={event} label={event} value={event} />));
   
    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
        <Header style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.eventCount} Events</Title>
            </Body>
            <Right>             
           {this.addButton()}
            </Right>
        </Header>
       <Content >
 <View style={{width:300, backgroundColor:"silver"}}>
         <Picker mode="dropdown" selectedValue={this.state.location}>
            <Picker.Item key={"All-States"} label={"Search By State"} value={"All"} />
             {states}
            </Picker>
            </View>
             <Picker
              mode="dropdown"
              iosHeader="Locations"
              selectedValue={this.state.location}
              onValueChange={this.onLocationChange.bind(this)} >
            <Picker.Item key={"All"} label={"Search By Locations"} value={"All"} />
             {locations()}
            </Picker> 

            <FlatList
  
          data={this.SearchFilterFunction(this.state.text)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
          </Content>
      </Container>
    );
  }
}

/**
       <CalendarView generalView/>
       <View style={{width:300, backgroundColor:"silver"}}>
         <Picker mode="dropdown" selectedValue={this.state.location}>
            <Picker.Item key={"All-States"} label={"Search By State"} value={"All"} />
             {states}
            </Picker>
            </View>
            <Picker
              mode="dropdown"
              iosHeader="Locations"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              selectedValue={this.state.location}
              onValueChange={this.onLocationChange.bind(this)} >
            <Picker.Item key={"All"} label={"Search By Locations"} value={"All"} />
             {locations()}
            </Picker> 
        <FlatList
  
          data={this.SearchFilterFunction(this.state.text)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
*/


const styles = StyleSheet.create({
  viewStyle: {justifyContent: 'center',flex: 1,padding: 10,
  },
innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},height:50,
  textStyle: {
    padding: 1, color:ACTIVE_TINT_COLOR
  },
  innerViewStyle:{margin:5,padding:5, borderRadius:20,alignSelf:"flex-end", position:"absolute", top:0},
bodyViewStyle:{flex:1},
  rightText:{alignSelf:"flex-end"},

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default EventSearchAndResultsScreen;
//export default withRouter(connect(mapStateToProps,matchDispatchToProps )(EventSearchAndResultsScreen))





