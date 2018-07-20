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
import FirebaseService from '../../services/firebase-service';
import {StackActions, NavigationActions} from 'react-navigation';
import {initialMyBooking} from '../../actions/my-booking-action';

class BookingConfirm extends Component {

  static navigationOptions = {
    title: 'BookingConfirm',
  }

  onPressConfirm(){
    this.insertBookingToFirebase()
  }

  insertBookingToFirebase(){
    const {bookingForm} = this.props;
    const {restaurant, refId} = this.props.restaurants;
    const userId = '1';
    const bookingUserRef = FirebaseService.child('bookings').child('users').child('1');
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let pressDate = days[new Date().getDay()]+' '+date+'-'+month+'-'+year+' '+hours+':'+min;
    const bookingData = {
      dateText: bookingForm.dateText,
      dateText_timeText: bookingForm.dateText+'_'+bookingForm.timeText,
      numOfCustomer: bookingForm.numOfCustomer,
      phone: bookingForm.phoneNumber,
      customer: bookingForm.customerName,
      timeText: bookingForm.timeText,
      pressDate: pressDate,
      restaurantId: refId,
      restaurant: restaurant.name,
      resImage: restaurant.image,
      totalPrice: bookingForm.price,
      userId: userId,
      status: 'booking',
    }
    if(restaurant.childPrice){
      bookingData.numOfCustomer = bookingForm.numOfCustomer+bookingForm.numOfChild;
      bookingData.numOfChild = bookingForm.numOfChild;
      bookingData.numOfAdult = bookingForm.numOfCustomer;
    }
    if(restaurant.drink){
      bookingData.includeDrink = bookingForm.drink;
    }
    try {
      bookingUserRef.push(bookingData);
      this.alertBookingResult(true)
    } catch (e) {
      return false;
      this.alertBookingResult(false);
    }

  }

  alertBookingResult(result){
    if(result){
      Alert.alert('Booking success');
      this.navigateToMyBookingList();
    }else{
      Alert.alert('Booking fail');
    }
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
    navigate('MyBookingList');
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
    initialMyBooking: () => dispatch(initialMyBooking())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirm)
//export default BookingConfirm;
