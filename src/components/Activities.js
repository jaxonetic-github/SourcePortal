import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, TextInput, Platform} from 'react-native';
import {Container, Content, Tab, Tabs} from 'native-base';
import {COMMON_DARK_BACKGROUND} from './../constants.js';
import EventSearch from './Event/eventSearch';
import ProfileSearch from './Profile/profileSearch.js';

/**
 * Represents a Trubrary component. It is the portal and container for the "Library"
 */
class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {searchText: '', selected: ''};
  }

  /** React Render
   * Render tabs
   **/
  render() {
    return (
      <Container>
        <Content padding>
          <Tabs locked>
            <Tab
              activeTabStyle={{backgroundColor: 'silver'}}
              tabStyle={{backgroundColor: COMMON_DARK_BACKGROUND}}
              heading={'Eventsss'}>
              <EventSearch />
            </Tab>
            <Tab
              activeTabStyle={{backgroundColor: 'silver'}}
              tabStyle={{backgroundColor: COMMON_DARK_BACKGROUND}}
              heading={'Profiles'}>
              <ProfileSearch />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

/**
 * map redux state to component props
 */
const mapStateToProps = (state) => {
  return {};
};

/** component specific styles*/
const styles = StyleSheet.create({});

export default connect(mapStateToProps, null)(Activities);
