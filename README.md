[![Build Status](https://travis-ci.com/jaxonetic-github/SourcePortal.svg?branch=main)](https://travis-ci.com/jaxonetic-github/SourcePortal)

### Architecture
[Mongo Stitch Atlas Cloud](https://www.mongodb.com/cloud/stitch) for the backend as a new and cloud alternative to Google Cloud or AWS. 
React Native for the front end 
   --redux saga, Native Module, Google Signin, Apple Maps, MongdDB Stitch integration

### Project Structure
* `.travis.yml` - Travis CI/CD 
* `src/index.js/` - react-native-web entry
* `src/services/` - essentially a dbo for the MongoStitchbackend
* `src/redux` - Redux specific files for state, and sagas
* `src/redux/saga` - Redux Sagas
* `src/components` - The applications react components (mobile & web)
* `src/components/Authentication` - The applications react components and redux files that handle authentication and connectivity changes
* `ios/Podfile` - IOS specific modifications
* `android` - Android specific modifications
* `docs` - Documentation coming
* `dist` - serve react-native-web from here 
* `__tests__/DBServicesSpec.js` - Unit Tests for the dbServices.js file
* `__tests__/` - Integration Test for Redux Saga flows


##### IOS

```
cd ios && pod install
cd ..
react-native run-ios 
```
<hr/>

##### Android
```
yarn start
react-native run-android
```
<hr/>
<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/ios_demo.gif" align="left" height="300" width="170" >
