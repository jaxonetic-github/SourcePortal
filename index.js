/**
 * @format

    "mongodb-stitch-react-native-sdk": "^4.4.0",
    "mongodb-stitch-browser-sdk": "^4.5.0",
    "mongodb-stitch-react-native-sdk": "^4.8.0",
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React, { Component } from "react";
import { Image, SafeAreaView, } from "react-native";

import { Root, Container,Header, Left,Content } from "native-base";
import sideBarReducer from './src/redux/sideBarReducer.js';
import { StyleSheet, View,Text,YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage,StatusBar} from 'react-native';
import { name as appName } from './app.json';


import { initialStoreState } from './src/redux/state.js';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { rootSaga } from './src/redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import resourcesReducer from './src/redux/resourcesReducer.js';
import videoRefsReducer from './src/redux/videoRefsReducer.js';
import profilesReducer from './src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from './src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from './src/components/Event/Redux/Reducers/eventReducer.js';
import createSagaMiddleware from 'redux-saga'
import BottomNav from './src/components/NavBars/BottomNav.js';
import FooterNav from './src/components/NavBars/footerNav.js';
import SideBar from './src/components/NavBars/sidebar.js';

import { Switch, Route, Redirect,Link } from 'react-router'
import { NativeRouter } from 'react-router-native'

import Trubrary from './src/components/Trubrary/trubrary';
import YouTubeList from './src/components/Trubrary/youtubeList.js';
import Activities from './src/components/Activities/Activities';
import SimpleWebview from './src/components/WebResources/simpleWebView.js';
import Home from './src/components/Home/home';
import CalendarView from './src/components/calendarView';
import MapView from './src/components/mapview';
import ProfileView from './src/components/Profile/profileview.native.js';
import EventView from './src/components/Event/eventView.js';
import EventSearch from './src/components/Event/eventSearch';

import { COMMON_DARK_BACKGROUND, COMMON_ICON_STYLE_SILVER, 
        ROUTE_PROFILE_VIEW,ROUTE_EVENT_VIEW, ROUTE_YOUTUBELIST_VIEW,ROUTE_ROOT,
         ROUTE_HOME, ROUTE_ACTIVITIES, ROUTE_TRUBRARY, ROUTE_MAPVIEW, 
         ICON_TAG_MENU, iconManager} from './src/constants.js'

// Logger with default options
import logger from 'redux-logger';
import SideMenu from 'react-native-side-menu';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileSearch from './src/components/Profile/profileSearch.js'
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import {AuthProvider} from './src/services/realmApp.js';


const sagaMiddleware = createSagaMiddleware();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux storey

const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware/*, logger*/) );


//YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps','Warning: componentWillUpdate', 'Warning: componentWillMount']);
console.disableYellowBox = true;

sagaMiddleware.run(rootSaga);



/*
 * A Navigation Stack for Profile related views (i.e. ProfileSearch, Profile)
 */
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileSearch" component={ProfileSearch} />
      <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  );
}

/*
 * A Navigation Stack for Events related views (i.e. EventSearch, EventView, Calendar and Map Views)
 */
function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventSearch" component={EventSearch} />
      <Stack.Screen name="Event" component={EventView} />
      <Stack.Screen name="Calendar" component={CalendarView} />
      <Stack.Screen name="MapView" component={MapView} />
    </Stack.Navigator>
  );
}

/*
 * A Tab Navigation for Activity related views (i.e. Events, Profiles related to Events)
 */
function ActivitiesTabs() {
  return (
   <Tab.Navigator>
           <Tab.Screen name="Events" component={EventStack} />
           <Tab.Screen name="Profile" component={ProfileStack} />
     </Tab.Navigator>
  );
}


function CustomDrawerContent(props) {

  customProps = {...props, labelStyle:styles.customDrawerLabelStyle, activeBackgroundColor:"silver", inactiveBackgroundColor:"white", style:{backgroundColor:COMMON_DARK_BACKGROUND}};
  return ( 
    <DrawerContentScrollView {...customProps}>
       <SideBar  {...customProps} />
      <DrawerItem {...customProps} label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

/*
 * Redux-ed application entry point
 */
export default function Main() {
  
  return (<Root>
  <SafeAreaView style={styles.safeArea}>

  <Provider store={store}>
    <NavigationContainer >
      <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen  name="Home" component={Home} />
      <Drawer.Screen name="Trubrary" component={Trubrary} />
      <Drawer.Screen name="Activities" component={ActivitiesTabs} />
      <Drawer.Screen name="ProfileView" component={ProfileView} />
    </Drawer.Navigator>
    </NavigationContainer>
   </Provider>

</SafeAreaView>
   </Root>);
  
}


const styles = StyleSheet.create({

  customDrawerLabelStyle : {fontSize:24},
  safeArea: { flex: 1} ,
  headerImageStyles:{
              height: 120,
              width: 250,
              position: "relative",
              alignSelf: "stretch",
              top: 10
            },
  container: {marginTop:30,
    backgroundColor:COMMON_DARK_BACKGROUND, borderRadius: 14, alignItems: 'center',height:125
  }
});


AppRegistry.registerComponent(appName, () => Main);
