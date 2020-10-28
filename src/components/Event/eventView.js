import { connect } from 'react-redux';
import {  addEventsToLocal,addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import withRouter from '../../withRouterManager.js';
import eventViewComponent from './eventViewComponent.js';



const mapStateToProps = state => {
  return {
    events: state.events.events,
    email: state.events.tmpEvent.email,
    name: state.events.tmpEvent.name,
    phone: state.events.tmpEvent.phone,
    website: state.events.tmpEvent.website,
    location: state.events.tmpEvent.location,
    calendar: state.events.tmpEvent.calendar,

    description: state.events.tmpEvent.description,
    imageURI: state.events.tmpEvent.imageURI
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventRequest:updateEventRequest,addEventsToLocal:addEventsToLocal, addEventRequest: addEventRequest }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(eventViewComponent)

