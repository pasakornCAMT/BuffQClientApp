'use strict';

import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import FirebaseService from '../../services/firebase-service';
import {StackActions, NavigationActions} from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';

import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';

class MyBookingUpdate extends Component {
  constructor(props) {
    super(props);

    this.bookingsRef = FirebaseService.child('bookings');
    const {navigation} = this.props;
    this.booking = navigation.getParam('booking');

    this.state = {
      dateText: this.booking.dateText,
      numOfCustomer: this.booking.numOfCustomer,
      customerName: this.booking.customer,
      phoneNumber: this.booking.phone,
    };
  }
  static navigationOptions = {
    title: 'MyBookingUpdate',
  };
  updateBooking(){
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'MyBooking' })],
    });
    Alert.alert(
      'Alert',
      'Do you want to update this booking?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.bookingsRef.child(this.booking.bookingKey).update({
            customer: this.state.customerName,
            dateText: this.state.dateText,
            numOfCustomer: this.state.numOfCustomer,
            phone: this.state.phoneNumber,
            pressDate: new Date().toLocaleString(),
          })
          Alert.alert('Update Success');
          //navigate('MyBooking');
          this.props.navigation.dispatch(resetAction);
        }},
      ]
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date+'-'+month+'-'+year;
    return (
      <View>
      <FormLabel>Select date</FormLabel>
      <DatePicker
      style={styles.datePicker}
      date={this.state.dateText}
      mode="date"
      format="DD-MM-YYYY"
      minDate= {mindate}
      //maxDate="2016-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 20
        },
        dateInput: {
          marginLeft: 56
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(dateText) => {this.setState({dateText: dateText})}}
      >
      </DatePicker>
      <FormLabel>People</FormLabel>
      <FormInput
      keyboardType = 'numeric'
      value={this.state.numOfCustomer}
      onChangeText={(value) => this.setState({numOfCustomer:value})}
      />
      <FormLabel>Phone number</FormLabel>
      <FormInput
      keyboardType = 'numeric'
      value={this.state.phoneNumber}
      onChangeText={(value) => this.setState({phoneNumber:value})}
      />
      <FormLabel>Name</FormLabel>
      <FormInput
      value={this.state.customerName}
      onChangeText={(value) => this.setState({customerName:value})}
      />
      <Button
        style={styles.button}
        title='Confirm'
        onPress={()=>{
          this.updateBooking();
        }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{

  },
  datePicker:{
    width: 200,
  }
});


export default MyBookingUpdate;
