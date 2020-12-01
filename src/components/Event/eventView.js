import { connect } from 'react-redux';
import {  addEventsToLocal,addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import withRouter from '../../withRouterManager.js';
import eventViewComponent from './eventViewComponent.js';



const mapStateToProps = state => {
  return {
   
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventRequest:updateEventRequest,addEventsToLocal:addEventsToLocal, addEventRequest: addEventRequest }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(eventViewComponent)

