'use strict';

import React, { Component } from 'react';
import MyBookingListView from '../main-components/MyBookingListView';
import {connect} from 'react-redux';
import {navigateToBookingDetail} from '../../actions/actions'
import {
  StyleSheet,
  View,
} from 'react-native';

class MyBookingList extends Component {
  static navigationOptions = {
    title: 'MyBookingList',
  };

  pressRow(booking, refId){
    console.log('passBooking: ', booking);
    console.log('ID: ', refId);
    this.props.navigateToBookingDetail(booking, refId)
    const {navigate} = this.props.navigation;
    navigate('MyBookingDetail');
  }

  render() {
    return (
      <MyBookingListView onPress={this.pressRow.bind(this)}/>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps (state) {
  return {
    MyBookingReducer: state.MyBookingReducer
  }
}

function mapDispatchToProps (dispatch){
  return{
    navigateToBookingDetail: (booking, refId) => dispatch(navigateToBookingDetail(booking, refId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingList)
//export default MyBookingList;
