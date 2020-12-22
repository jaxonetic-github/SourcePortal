//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Container, Header, Content, ListItem, Thumbnail,Card, CardItem } from 'native-base';
import {commonViewButton, COMMON_DARK_BACKGROUND, NO_PHOTO_AVAILABLE_URI, COMMON_LISTVIEW_ITEM_SEPARATOR,
        ROUTE_SIMPLE_WEB_VIEW} from '../../constants.js'
import WebResourcesList from './webResourcesListComponent.js'

const mapStateToProps = state => ({webResources: state.resourcesData.webResources})

export default connect(mapStateToProps,null )(WebResourcesList)





