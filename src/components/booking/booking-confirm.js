'use strict';

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';
import FirebaseService from '../../services/firebase-service';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class BookingConfirm extends Component {
  static navigationOptions = {
    title: 'BookingConfirm',
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const dateText = navigation.getParam('dateText');
    const numOfCustomer = navigation.getParam('numOfCustomer');
    const item = navigation.getParam('item');
    const phoneNumber = navigation.getParam('phoneNumber');
    const customerName = navigation.getParam('customerName');
    //this.bookingRef = FirebaseService.child('items').child(item._key).child('bookings');
    this.bookingRef = FirebaseService.child('bookings');
    //this.userBookingRef = FirebaseService.child('users');
    return (
      <View>
        <Text>
          date/time: {dateText}
        </Text>
        <Text>
          customer: {numOfCustomer}
        </Text>
        <Text>
          phone number: {phoneNumber}
        </Text>
        <Text>
          customer name: {customerName}
        </Text>
        <Text>
          key: {item._key}
        </Text>
        <Button
          title='Confirm'
          onPress={()=>{
            this.bookingRef.push({
              dateText: dateText,
              numOfCustomer: numOfCustomer,
              phone: phoneNumber,
              customer: customerName,
              pressDate: new Date().toLocaleString(),
              restaurant: item.title,
              resImage: item.image,
            });
            /*this.userBookingRef.push({
              dateText: dateText,
              numOfCustomer: numOfCustomer,
              phoneNumber: phoneNumber,
              customer: customerName,
              resName: item.title,
              resImage: item.image,
            });*/
            //navigate('MyBooking');
          }}
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default BookingConfirm;
