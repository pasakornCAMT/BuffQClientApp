'use strict';

import React, { Component } from 'react';
import {StackNavigator, StackActions, NavigationActions} from 'react-navigation';
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
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.bookingRef = FirebaseService.child('bookings');
    return (
      <View>
        <Text>
          date: {dateText}
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
            /*this.bookingRef.push({
              dateText: dateText,
              numOfCustomer: numOfCustomer,
              phone: phoneNumber,
              customer: customerName,
              pressDate: new Date().toLocaleString(),
              restaurant: item.title,
              resImage: item.image,
            });*/
            navigation.dispatch(resetAction);
            navigate('MyBooking');
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
