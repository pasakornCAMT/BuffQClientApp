'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {initialMyBooking, fetchMyBookingFromFirebase} from '../../actions/my-booking-action';
import { insertBookingToFirebase } from '../../actions/firebase-action';

class BookingConfirm extends Component {

  static navigationOptions = {
    title: 'BookingConfirm',
  }

  onPressConfirm(){
    const {bookingForm} = this.props;
    const {restaurant} = this.props.restaurants;
    let result = insertBookingToFirebase(bookingForm, restaurant);
    result ? this.navigateToMyBookingList() : null
  }

  navigateToMyBookingList(){
    const {navigate, dispatch} = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    dispatch(resetAction);
    this.props.initialMyBooking();
    this.reloadMyBooking();
    navigate('MyBookingList');
  }

  reloadMyBooking(){
    this.props.fetchMyBookingFromFirebase();
  }

  render() {
    const {
      dateText,
      timeText,
      numOfCustomer,
      numOfChild,
      phoneNumber,
      customerName,
      price,
    } = this.props.bookingForm
    const {restaurant, refId} = this.props.restaurants
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.detail}>
          date: {dateText}
        </Text>
        <Text style={styles.detail}>
          time: {timeText}
        </Text>
        <Text style={styles.detail}>
          customer: {numOfCustomer+numOfChild} people
        </Text >
        {
          restaurant.childPrice ? (
            <Text style={styles.detail}>
              adult: {numOfCustomer} | child: {numOfChild}
            </Text >
          ):null
        }
        <Text style={styles.detail}>
          phone number: {phoneNumber}
        </Text>
        <Text style={styles.detail}>
          customer name: {customerName}
        </Text>
        <Text style={styles.detail}>
          Total Price: {price} THB
        </Text>
        </View>
        <Button
          title='Confirm'
          backgroundColor = 'tomato'
          onPress={this.onPressConfirm.bind(this)}
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    margin: 10,
    borderRadius:10,
    padding: 5,
  },
  detail:{
    fontSize: 16,
  }
});

function mapStateToProps (state) {
  return {
    bookingForm: state.bookingForm,
    restaurants: state.restaurants,
    MyBookingReducer: state.MyBookingReducer,
  }
}

function mapDispatchToProps (dispatch){
  return{
    initialMyBooking: () => dispatch(initialMyBooking()),
    fetchMyBookingFromFirebase: () => dispatch(fetchMyBookingFromFirebase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirm)
//export default BookingConfirm;
