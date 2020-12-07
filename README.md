[![Build Status](https://travis-ci.com/jaxonetic-github/SourcePortal.svg?branch=main)](https://travis-ci.com/jaxonetic-github/SourcePortal)

[![codecov](https://codecov.io/gh/jaxonetic-github/SourcePortal/branch/main/graph/badge.svg?token=URI7MHUM8M)](https://codecov.io/gh/jaxonetic-github/SourcePortal)


### Architecture
[Mongo Stitch Atlas Cloud](https://www.mongodb.com/cloud/stitch) for the backend as a new and cloud alternative to Google Cloud or AWS. 
React Native for the front end 
   --redux saga, Native Module, Google Signin, Apple Maps, MongdDB Stitch integration

### Project Structure
* `.travis.yml` - Travis CI/CD 
* ` index.js` -  RNative Component Code entry point 
* `src/services/` - essentially a dbo for the MongoStitchbackend
* `src/redux` - Redux specific files for state, and sagas
* `src/redux/saga` - Redux Sagas
* `src/components` - The applications react components (mobile & web)
* `ios/Podfile` - IOS Pods for Native Linking and integration
* `docs` - Documentation coming
* `__tests__/` - Unit and Integration Tests for Components and Redux Saga flows
*`README.md` - this file

<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/ios_demo.gif" align="left" height="300" width="170" >

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
