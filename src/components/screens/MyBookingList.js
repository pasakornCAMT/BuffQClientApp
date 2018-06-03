'use strict';

import React, { Component } from 'react';
import MyBookingListView from '../main-components/MyBookingListView';

import {
  StyleSheet,
  View,
} from 'react-native';

class MyBookingList extends Component {
  static navigationOptions = {
    title: 'MyBookingList',
  };

  pressRow(booking){
    const {navigate} = this.props.navigation;
    navigate('MyBookingDetail',{
      booking: booking,
    });
  }

  render() {
    return (
      <MyBookingListView onPress={this.pressRow.bind(this)}/>
    );
  }
}

const styles = StyleSheet.create({

});


export default MyBookingList;
