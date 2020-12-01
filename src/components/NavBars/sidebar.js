import React from "react";
//import PropTypes from 'prop-types';
import withRouter from '../../withRouterManager.js';

import { FlatList , Image, StyleSheet } from "react-native";
//import { Image, StyleSheet } from "react-primitives";
import { Text, Container,  ListItem, Content, Card, CardItem,Left} from "native-base";
//redux 
import { connect } from 'react-redux';
//actions
//components
import Authentication from '../Authentication/authenticationComponent';
//constants
import {COMMON_LISTVIEW_ITEM_SEPARATOR, NEED_AT_LEAST_ANONYMOUS_LOGIN,
 COMMON_DARK_BACKGROUND,COMMON_ICON_STYLE,ROUTE_PROFILE_VIEW, iconManager} from '../../constants.js'
 


/**
 * sideBar component manages the drawer sidebar
 * SideBar renders a header and an array of ListItems 
 */
class SideBar extends React.Component {

  constructor(props) {
    super(props);
   // console.log("\nsidebar props",this.props.navigation);
    }

/**
 * Only show the rows that the user is entitled  to see.  This will be  moved into Stitch User roles later
 */
_listDataFilter= (data) =>{
  const tmpData =data?  data.filter((item)=>{

      return ((item.requiresVerification && this.props.isLoggedIn)|| !item.requiresVerification)?true:false;}):[];

  return tmpData;
}

/** The Header  section */
renderHeader = () =>{return(
   <Container style={styles.container}>     
    <Image
            style={styles.headerImageStyles}
            source={{
              uri:"https://i0.wp.com/www.experience-ancient-egypt.com/wp-content/uploads/2015/05/egyptian-goddess-maat.jpg"
            }}
          />
          </Container>
        )}

/** 
  * Render a listitem/row into the list
  * @param data:  a sidebar data record
    */
      _renderRow=(data) => {

        const tst = data.item.path.indexOf(ROUTE_PROFILE_VIEW)>=0;
 
               return (
                <ListItem style={styles.listItemStyles}
                  button onPress={() =>this.props.navigation.navigate(data.item.path, {  profileIndex: 1, role:this.props.profileIndex, loggedInUserProfile:this.props.loggedInUserProfile  }) }>
                  <Left>
                  {iconManager(data.item.icon, styles.headerIconStyle)}
               <Text style={styles.menuItemStyles}>{data.item.label}</Text>
              </Left>            
            </ListItem>)
             }


 /**
  * Exract a key from an object for the List
  */
    _keyExtractor = (item, index) =>{  return item.routeName};


 /**   
  * Render   data={this._listDataFilter(this.props.sideBarData)}
  */
  render() {
    return (<Container style={{backgroundColor:COMMON_DARK_BACKGROUND}}><Content><Card><CardItem>
        <FlatList 
          ListHeaderComponent={this.renderHeader}
          data={this.props.sideBarData}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
       </CardItem>  
       <CardItem><Authentication/></CardItem>
      </Card></Content></Container>);
  }
}

const styles = StyleSheet.create({
  menuItemStyles:{marginLeft: 10},
  headerImageStyles:{
              height: 120,
              width: 250,
              position: "relative",
              alignSelf: "stretch",
              top: 10
            },
  listItemStyles:{ flex: 1, padding: 0, borderRadius: 15 },
  container: {marginTop:30,
    backgroundColor:COMMON_DARK_BACKGROUND, borderRadius: 14, alignItems: 'center',height:125
  }
})

const mapStateToProps = state => (
    {isLoggedIn: true, //(state.auth!==1) && (state.auth.auth.loggedInProviderName==="oauth2-google"),
    profileIndex:1,// ((state.auth!== NEED_AT_LEAST_ANONYMOUS_LOGIN) &&  (state.auth.auth.loggedInProviderName==="oauth2-google") && state.auth.auth.userProfile.identities[0].id) ?state.auth.auth.userProfile.identities[0].id:null,
    sideBarData: state.sideBar,
    loggedInUserProfile:state.profiles.profiles[1],
    sideBarIconStyle: COMMON_ICON_STYLE,
})

/**
 * Potential properties to override state

SideBar.propTypes = {
  
  sideBarData:PropTypes.array
}; */
export default connect(mapStateToProps, null)(SideBar)





