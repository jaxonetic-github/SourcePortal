import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet,Image,   ImagePickerIOS, View,TextInput} from 'react-native';
import { Container,Button,Separator,Thumbnail, Header, Content, List, ListItem,Title,Item,
                                    Accordion,   Text,Textarea, Icon, Left, Body, Right, Switch, Toast,H1 } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest, updateProfile,  addProfile} from './Redux/Actions/profile.js';
import { getDefaultProfile,iconManager,ICON_REMOVE_CIRCLE,ICON_ADD_CIRCLE,COMMON_ICON_STYLE, NEED_AT_LEAST_ANONYMOUS_LOGIN, TEXT_SAVE,
 TEXT_UPDATE, NO_PHOTO_AVAILABLE_URI,ICON_ALL_ARROWFORWARD,ICON_IOS_MAIL, ICON_ANDROID_MAIL,
TEXT_WEBSITE, TEXT_MAIL,TEXT_PHONE,TEXT_DESCRIPTION, ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
ICON_IOS_GLOBE, ICON_ANDROID_GLOBE, ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION, TEXT_NAME,
ICON_IOS_CIRCLE, ICON_ANDROID_CIRCLE,ICON_IOS_PERSON, ICON_ANDROID_PERSON, COMMON_DARK_BACKGROUND,
 TEXT_CURRENT_IMAGE,ROUTE_SIMPLE_PROFILE_INPUT,PROFILE, header} from '../../constants.js';
import { UPDATE_PROFILE_DESC_BY_KEY, UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY,UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY,
        ADD_NAME, ADD_PROFILE, ADD_DESC,  ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../redux/types';



/**
*   ProfileView - The Screen to view and potentially edit a profile.
*             Parameters coming from Route object or element properties
*   route {  profileIndex: id,  profile:{}, role:id, loggedInUserProfile:{only set from sidebar Settings}} 
*     -if there is a route object then component expects a profileIndex and a Profile to display or Profile of loggedInUser;
*        otherwise, the component will expect to find  profile info in the Redux properties
* <Profile  profileIndex={'1'} route={this.props.route}  updateProfile={this.updateProfile}  updateProfileRequest={this.props.updateProfileRequest} addProfileRequest={this.props.addProfileRequest} addProfile={this.props.addProfile} />
*
*/
class ProfileViewComponent extends Component {

  constructor(props) {
   super(props);

   /*
   * Component action methods taken from properties or route
   */
   const updateProfile = this.props.updateProfile || this.props.route.params.updateProfile;
   const addProfile = this.props.addProfile || this.props.route.params.addProfile;
   const updateProfileRequest = this.props.updateProfileRequest || this.props.route.params.updateProfileRequest;
   const addProfileRequest = this.props.addProfileRequest || this.props.route.params.addProfileRequest;
   const isNewProfile = this.props.isNewProfile || this.props.route.params.isNewProfile;
   //xconsole.log(updateProfile, "ProfileViewComponent**********",this.props.route);
   //if navigating into component, use route params
   const routeIndex = this.props.route ?  this.props.route.params.profileIndex : null;
   //No role means View only, no update or adding
  // const hasRole = props.role  || (routeIndex && this.props.route.params.role) ;
   //const role = (hasRole && props.role) ? props.role : this.props.route.params.role;
  //  let updateIndex;// = props.profileIndex || this.props.route.params.params.profileIndex ;
//console.log("------>",this.props.route,"routeIndex and props---->\n");
    if(isNewProfile) 
    {
      const newProfile = getDefaultProfile();
      //this.props.addProfileRequest(newProfile);
      this.state = { dataIndex:newProfile.id, isNewProfile:isNewProfile, profile:newProfile, addProfile:addProfile, addProfileRequest:addProfileRequest};
    }else if(routeIndex && !this.props.route.params.loggedInUserProfile && this.props.route.params.profileIndex){
    let updateIndex = this.props.route.params.profileIndex ;

      this.state = { dataIndex:routeIndex, isNewProfile:false, profile:this.props.route.params.profile, updateProfile:updateProfile, updateProfileRequest:updateProfileRequest};
       //  console.log(this.state,"=====old 2222Updateable====",props )

    }else if(routeIndex && this.props.route.params.loggedInUserProfile){
        this.state = {dataIndex:this.props.route.params.profileIndex, isNewProfile:false, profile:this.props.route.params.loggedInUserProfile , updateProfile:updateProfile, updateProfileRequest:updateProfileRequest};
     console.log(this.state,"=====PersonalProfle & Updateable====" )

    }
    console.log("this.state in profileviewcomponent STATE::>",this.state);
  }


   arrowIcon = ()=>this.props.isGoogleUser ? <Icon style={COMMON_ICON_STYLE}  name={ICON_ALL_ARROWFORWARD} /> : null;

/**
 *  When the User presses save/update button, this method fires the corresponding redux actions
 */
  // _onPress = () => this.state.isNewProfile ? this.state.addProfile(this.state.profile) : this.state.updateProfileRequest(this.state.profile) ;
  

/**  User selects image */
onPressImagePicker = () =>{

  const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({
      avatarSource: source,
    });
  }
});

}


/*
 * 
 */
  addButton = (isPersonalProfile)=>{
   //determine whether to add or update when user clicks button
  // const onPressAction = ()=>( isPersonalProfile ? this.updateProfile() :this._onPress() );
   //determine whether to show "Save" or "Update" depending on ownership
   const buttonText = this.state.isNewProfile ?  TEXT_SAVE : TEXT_UPDATE;
   const _saveButton =  
   (<Button style={{backgroundColor:"maroon", padding:0, margin:0}} iconLeft small  onPress={()=> this.state.isNewProfile  ? this.state.addProfile(this.state.profile): this.state.updateProfile(this.state.profile)  } >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={COMMON_ICON_STYLE}/>
               <Text style={{color:"gold"}}>{buttonText}</Text>
            </Button>);

    return _saveButton; 
  };


/**
 * A header view to display the profile data when not in "Edit" mode
 */
    _renderHeader=(expanded,icon_ios, icon_droid, iconsStyle,titleText,bodyText,rightComponent)=>{ 
      const iconDisplay = expanded
          ? <Icon style={{fontSize: 20, color: 'silver', flex:1, alignSelf:"flex-end"}} name={ICON_REMOVE_CIRCLE} />
          : <Icon style={{fontSize: 20, color: 'silver', position:"absolute", right:5, top:20}} name="create"></Icon>

      return (<View  key={titleText}  style={{flex:1,backgroundColor:"white"}}>
              <Item>
               <Icon ios={icon_ios} android={icon_droid} style={{fontSize: 20, color: 'silver'}}/>
               <Text 
              accessibilityHint="input" style={{color:"silver"}}>{titleText}</Text>
              </Item>
            <Text  style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"white"}}>{bodyText}</Text>
            {this.state.dataIndex==this.props.profileIndex ? iconDisplay:null }
          </View>);
          }
           
 

  _renderContent = (item) =>
  {
    //upate or add
    inputType= this.state.dataIndex?item.updateAction: item.addAction;

    const view = (<View  style={{flex:1, alignItems:"center",backgroundColor:"silver", borderRadius:10}}>
      <TextInput
      role="profileInput"
        style={styles.input}
        value={item.displayText}
        accessibilityLabel={item.titleText}
        onChangeText={(text)=>{
          const tmpProfile = this.state.profile;
          tmpProfile[item.key.toLowerCase()] = text;
          this.setState({profile:tmpProfile});}}
        placeHolder={item.titleText}
        onBlur={(blur) => console.log("onBlur")}
      />     
              </View>);
    return (this.state.dataIndex==this.props.profileIndex )? view : view ;
}

/**
*
*/
  render(){

    const isPersonalProfile = (typeof this.state.dataIndex !== 'undefined')&& (this.state.dataIndex == this.props.profileIndex);
    const headerTitle =  PROFILE  ;

  const profileData= [
    {key:TEXT_NAME,titleText:TEXT_NAME, icon_ios:ICON_IOS_PERSON,icon_droid:ICON_ANDROID_PERSON,
     updateAction:UPDATE_PROFILE_NAME_BY_KEY, addAction:ADD_NAME,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.profile.name, actionIcon:this.arrowIcon() },
    {key:TEXT_MAIL,titleText:TEXT_MAIL, icon_ios:ICON_IOS_MAIL,icon_droid:ICON_ANDROID_MAIL,
      updateAction:UPDATE_PROFILE_EMAIL_BY_KEY, addAction:ADD_EMAIL,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.profile.email, actionIcon:this.arrowIcon() },
    {key:TEXT_PHONE,titleText:TEXT_PHONE, icon_ios:ICON_IOS_PORTRAIT,icon_droid:ICON_ANDROID_PORTRAIT,
      updateAction:UPDATE_PROFILE_PHONE_BY_KEY, addAction:ADD_PHONE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.profile.phone, actionIcon:this.arrowIcon() },
    {key:TEXT_WEBSITE,titleText:TEXT_WEBSITE, icon_ios:ICON_IOS_GLOBE,icon_droid:ICON_ANDROID_GLOBE,
           updateAction:UPDATE_PROFILE_WEBSITE_BY_KEY, addAction:ADD_WEBSITE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.profile.website, actionIcon:this.arrowIcon() },
    {key:TEXT_DESCRIPTION,titleText:TEXT_DESCRIPTION, icon_ios:ICON_IOS_DESCRIPTION,icon_droid:ICON_ANDROID_DESCRIPTION,
      updateAction:UPDATE_PROFILE_DESC_BY_KEY, addAction:ADD_DESC,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.state.profile.description, actionIcon:this.arrowIcon() }
      ];


 const items = profileData.map((record, index)=>{
return (<Accordion  key={record.key}
style={{ paddingBottom:15,paddingTop:5}}
        dataArray={[record]}
        animation={true}
         renderContent={this._renderContent}
       renderHeader= {(item, expanded)=> {
          const title = item;
            return (    
              this._renderHeader(expanded,item.icon_ios, item.icon_droid, COMMON_ICON_STYLE, item.titleText, item.displayText,
                  item.displayText,null )
            );
          }}/>);
 });
    return (
      <Container  style={{backgroundColor: COMMON_DARK_BACKGROUND}}>
         <Header style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"}}>
            <Body>
              <H1 style={{color:"silver", textTransform:"capitalize", fontSize:35}}>{headerTitle}</H1>
            </Body>
            <Right>{this.addButton(isPersonalProfile)}</Right>
        </Header>
   <Content padder>
           {items}
          <View style={{borderWidth:2, borderColor:"silver"}}>
              <Left>
              <Button transparent disabled onPress={() => this.onPressImagePicker()}>
                 <Text>{TEXT_CURRENT_IMAGE}</Text>
                 {this.arrowIcon()}
              </Button>
              </Left>
              <Body>
                <Image style={styles.profileImage} source={{uri:this.state.profile.ImageURI}} />              
              </Body>  
            </View>
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
   profileImage:{width:195, height:240},
   profileSeparatorStyle:{backgroundColor:"silver"}
});



/**
 * Potential properties to override state
 */
ProfileViewComponent.propTypes = {
  profileIndex: PropTypes.string,
  profiles: PropTypes.object
};



export default ProfileViewComponent;

