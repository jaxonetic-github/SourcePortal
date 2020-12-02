import { UPDATE_PROFILE, UPDATE_PROFILE_DESC_BY_KEY, FETCH_PROFILE_SUCCESS, UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY, UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY, REMOVE_LOCAL_PROFILE,
 ADD_PROFILE_TO_USERPROFILES, ADD_NAME, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../../../redux/types';

/**
 * 
 */
const profileReducer = (state={}, action) => {

  switch(action.type) {
    case FETCH_PROFILE_SUCCESS:
        let backEndProfiles={} ;/*= action.payload.map(item=>({[item.id]:item}))*/
       for (var i = 0; i < action.payload.length; i++) {
          backEndProfiles[action.payload[i].id]=action.payload[i]
        }   
        return {  tmpProfile:{...state.tmpProfile },
                  profiles:backEndProfiles
              };
      
    case UPDATE_PROFILE:
      let stateProfiles = {...state.profiles};
      let tmpId = action.payload.id ;

      delete stateProfiles[tmpId];

      stateProfiles[tmpId] = action.payload;
      console.log(stateProfiles[tmpId]);

    //newEvents = {...newEvents, ...profiles}
    return {
        tmpProfile:{...state.tmpProfile}, 
        profiles:stateProfiles
      };

       case ADD_PROFILE_TO_USERPROFILES:

 let newProfiles = {...state.profiles};
 /*   let profiles = action.payload.filter(filt=>{
   if(!state.profiles[filt.id]);
         newProfiles = {...newProfiles, [filt.id]:filt}
        return !state.profiles[filt.id];
      })
*/newProfiles[action.payload.id] = action.payload;
    //newEvents = {...newEvents, ...profiles}
    return {
        tmpProfile:{...state.tmpProfile}, 
        profiles:newProfiles
      };
  case REMOVE_LOCAL_PROFILE:
      let tmp = {...state.profiles};

      let deltmp = delete tmp[action.payload.id];

      return {
       tmpProfile:{...state.tmpProfile },
         profiles:tmp
      };    

    default:
      return state;
  }
}

export default profileReducer;