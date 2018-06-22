'use strict';

import React, { Component } from 'react';
import MyBookingListView from '../main-components/MyBookingListView';
import {connect} from 'react-redux';
import {preparedBookingDetail, getRestaurantById} from '../../actions/actions'
import {
  StyleSheet,
  View,
} from 'react-native';

class MyBookingList extends Component {
  static navigationOptions = {
    title: 'MyBookingList',
  };

  pressRow(booking, refId, restaurantId){
    console.log('passBooking: ', booking);
    console.log('ID: ', refId);
    this.props.preparedBookingDetail(booking, refId);
    this.props.getRestaurantById(restaurantId);
    this.navigateToBookingDetail();
  }

  navigateToBookingDetail(){
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
    preparedBookingDetail: (booking, refId) => dispatch(preparedBookingDetail(booking, refId)),
    getRestaurantById: (refId) => dispatch(getRestaurantById(refId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingList)
//export default MyBookingList;
