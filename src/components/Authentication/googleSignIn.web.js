/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { googleSignInRequest,googleServerAuthCodeReceived } from './Redux/Actions/authActions.js'

class GoogleSignInComp extends Component {

  
// Somewhere in your code
_signIn = async () => {
  try {
   
    this.props.googleSignInRequest();
    //this.props.loginUserRequest(userInfo)
  } catch (error) {
    console.error(error)
  }
};


  render() {
    return(
       <View style={styles.container}>
<<<<<<< HEAD
       <GoogleLogin
    clientId="296133059037-e0e00st9hmm6df7s11ptilm1rqsvqo5f.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this._signIn}
    onFailure={this._signIn}
    cookiePolicy={'single_host_origin'}
  />
=======
>>>>>>> parent of f1225d23... pre firebase branch
</View>)
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, 
  signInButtonStyles:{ width: 200, height: 45 }
});


function matchDispatchToProps(dispatch){
  return bindActionCreators({googleSignInRequest:googleSignInRequest }, dispatch)
}

export default connect(null, matchDispatchToProps)(GoogleSignInComp)


