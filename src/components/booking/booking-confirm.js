'use strict';

import React, { Component } from 'react';
import {StackNavigator, StackActions, NavigationActions} from 'react-navigation';
import {Button} from 'react-native-elements';
import FirebaseService from '../../services/firebase-service';

import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';

class BookingConfirm extends Component {
  static navigationOptions = {
    title: 'BookingConfirm',
  };
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    this.dateText = navigation.getParam('dateText');
    this.numOfCustomer = navigation.getParam('numOfCustomer');
    this.phoneNumber = navigation.getParam('phoneNumber');
    this.customerName = navigation.getParam('customerName');
    this.restaurant = navigation.getParam('restaurant');
    this.timeText = navigation.getParam('timeText');
    this.bookingRef = FirebaseService.child('bookings');
    this.state = {

    };
  }

  onPressConfirm(){
    this.bookingRef.push({
      dateText: this.dateText,
      numOfCustomer: this.numOfCustomer,
      phone: this.phoneNumber,
      customer: this.customerName,
      timeText: this.timeText,
      pressDate: new Date().toLocaleString(),
      restaurant: this.restaurant.title,
      resImage: this.restaurant.image,
      resKey: this.restaurant._key,
    });
    Alert.alert('Booking success');
  }

  render() {
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'MyBooking' })],
    });
    return (
      <View>
        <Text>
          date: {this.dateText}
        </Text>
        <Text>
          time: {this.timeText}
        </Text>
        <Text>
          customer: {this.numOfCustomer}
        </Text>
        <Text>
          phone number: {this.phoneNumber}
        </Text>
        <Text>
          customer name: {this.customerName}
        </Text>
        <Text>
          key: {this.restaurant._key}
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
            this.onPressConfirm();
            this.props.navigation.dispatch(resetAction);
            //this.props.navigation.navigate('MyBooking');
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
