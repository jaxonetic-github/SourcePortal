/**
 * @format


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
import ProfileView from './src/components/Profile/profileview';
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
import ProfileSearch from './src/components/Profile/profileSearch.js'
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem } from '@react-navigation/drawer';


const sagaMiddleware = createSagaMiddleware();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux store
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );


//YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps','Warning: componentWillUpdate', 'Warning: componentWillMount']);
console.disableYellowBox = true;

sagaMiddleware.run(rootSaga);


DrawerImage = () =>{return(
   <Container style={styles.container}><Content>    
    <Image  style={styles.headerImageStyles}
            source={{
              uri:"https://i0.wp.com/www.experience-ancient-egypt.com/wp-content/uploads/2015/05/egyptian-goddess-maat.jpg"
            }}/></Content></Container>)};


function StackedHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {

  customProps = {...props, labelStyle:styles.customDrawerLabelStyle, activeBackgroundColor:"silver", inactiveBackgroundColor:"white", style:{backgroundColor:COMMON_DARK_BACKGROUND}};

  return (
    
    <DrawerContentScrollView {...customProps}>
    <DrawerImage />
      <DrawerItemList  {...customProps} />
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
      <Drawer.Navigator openByDefault={true} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen  name="Home" component={StackedHome} />
      <Drawer.Screen name="Trubrary" component={Trubrary} />
      <Drawer.Screen name="Activities" component={Activities} />
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
