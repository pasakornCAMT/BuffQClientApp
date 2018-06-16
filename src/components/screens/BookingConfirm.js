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

class BookingConfirm extends Component {

  static navigationOptions = {
    title: 'BookingConfirm',
  }

  onPressConfirm(){
    const bookingRef = FirebaseService.child('bookings');
    const {bookingForm} = this.props;
    const {restaurant} = this.props.restaurants;
    bookingRef.push({
      dateText: bookingForm.dateText,
      numOfCustomer: bookingForm.numOfCustomer,
      phone: bookingForm.phoneNumber,
      customer: bookingForm.customerName,
      timeText: bookingForm.timeText,
      pressDate: new Date().toLocaleString(),
      restaurant: restaurant.title,
      resImage: restaurant.image,
    })
    Alert.alert('Booking success');
    this.navigateToMyBookingList();
  }

  navigateToMyBookingList(){
    const {navigate, dispatch} = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    dispatch(resetAction);
    navigate('MyBookingList');
  }

  render() {
    const {
      dateText,
      timeText,
      numOfCustomer,
      phoneNumber,
      customerName,
    } = this.props.bookingForm
    const {restaurant} = this.props.restaurants
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
          customer: {numOfCustomer}
        </Text >
        <Text style={styles.detail}>
          phone number: {phoneNumber}
        </Text>
        <Text style={styles.detail}>
          customer name: {customerName}
        </Text>
        <Text style={styles.detail}>
          key: {restaurant.key}
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
    fontSize: 20,
  }
});

function mapStateToProps (state) {
  return {
    bookingForm: state.bookingForm,
    restaurants: state.restaurants,
  }
}

export default connect(mapStateToProps)(BookingConfirm)
//export default BookingConfirm;
