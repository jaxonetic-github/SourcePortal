
import {REMOTE_RESOURCE_STRING} from  '../constants.js'

/**
*  This CrudService is for the MongoDB Stitch Backend.
*/
import Realm from 'realm';
import React, {useContext, useState} from 'react';

let app;
let anonymousUser;
let AuthContext;
let context;
let anonymousCredential

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {

    const appId = REMOTE_RESOURCE_STRING; // Set Realm app ID here.

    const appConfig = {
      id: appId,
      timeout: 10000,
 /*     app: {
        name: 'default',
        version: '0',
      },*/
    };
    console.log(app,"getRealmApp",appId);
    app = new Realm.App(appConfig);
  }

}


// Returns the shared instance of the Realm app.
export function getAnonymousCredential() {
  if (anonymousCredential === undefined) {
     anonymousCredential = Realm.Credentials.anonymous();
  }
  return anonymousCredential;
}


// Returns the shared instance of the Realm app.
export function getAuthContext() {
  if (context === undefined) {
    context =  React.createContext(null);
  }
  return context;
}

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // The log in function takes an email and password and uses the Email/Password
  // authentication provider to log in.
  const logIn = async (email, password) => {
    console.log(`Logging in as ${email}...`);
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
    console.log(`Logged in as ${newUser.id}`);
  };

  // Log out the current user.
  const logOut = () => {
    if (user == null) {
      console.warn("Not logged in -- can't log out!");
      return;
    }
    console.log('Logging out...');
    user.logOut();
    setUser(null);
  };

  // The register function takes an email and password and uses the emailPassword
  // authentication provider to register the user.
  const registerUser = async (email, password) => {
    console.log(`Registering as ${email}...`);
    await app.emailPasswordAuth.registerUser(email, password);
  };

 var AuthContext = getAuthContext();

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        registerUser,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};


// The useAuth hook can be used by components under an AuthProvider to access
// the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export {AuthProvider, useAuth};

