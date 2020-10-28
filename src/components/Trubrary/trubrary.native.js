import { connect } from 'react-redux';

//import withRouter from '../../withRouterManager.js';

import Trubrary from './trubraryComponent.js';

/**
 * map redux state to component props videoData, onlineMediaContent, webResources
 */
const mapStateToProps = state => {
  return {
    videoData: state.resourcesData.youTubeResources, 
    onlineMediaContent: state.resourcesData.onlineMediaContent,
    webResources: state.resourcesData.webResources
  }
}


export default connect(mapStateToProps,null )(Trubrary)





