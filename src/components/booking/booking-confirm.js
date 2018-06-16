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
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.detail}>
          date: {this.dateText}
        </Text>
        <Text style={styles.detail}>
          time: {this.timeText}
        </Text>
        <Text style={styles.detail}>
          customer: {this.numOfCustomer}
        </Text >
        <Text style={styles.detail}>
          phone number: {this.phoneNumber}
        </Text>
        <Text style={styles.detail}>
          customer name: {this.customerName}
        </Text>
        <Text style={styles.detail}>
          key: {this.restaurant._key}
        </Text>
        </View>
        <Button
          title='Confirm'
          backgroundColor = 'tomato'
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
            //this.onPressConfirm();
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate('MyBookingList');
          }}
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


export default BookingConfirm;
