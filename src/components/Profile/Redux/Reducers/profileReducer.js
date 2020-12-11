import { UPDATE_PROFILE, FETCH_PROFILE_SUCCESS,  DELETE_PROFILE_REQUEST,
 ADD_PROFILE_TO_USERPROFILES} from '../../../../redux/types';

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
    case DELETE_PROFILE_REQUEST :
      let profs = {...state.profiles};
      let idOfProfileToDelete = action.payload;

      //at some point, will allow update of individual fields
      delete profs[idOfProfileToDelete];

    return {
        profiles:profs
      };
  
    case UPDATE_PROFILE:
      let stateProfiles = {...state.profiles};
      let tmpId = action.payload.id ;

      //at some point, will allow update of individual fields
      //delete stateProfiles[tmpId];

      stateProfiles[tmpId] = action.payload;
      
    //newEvents = {...newEvents, ...profiles}
    return {
        profiles:stateProfiles
      };

  case ADD_PROFILE_TO_USERPROFILES:

    let newProfiles = {...state.profiles};
    newProfiles[action.payload.id] = action.payload;
    return { profiles:newProfiles};
  
   default:
      return state;
  }
}

export default profileReducer;