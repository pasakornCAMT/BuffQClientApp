'use strict';

import React, { Component } from 'react';
import {FormLabel, FormInput, Button, ButtonGroup} from 'react-native-elements'
import {connect} from 'react-redux';
import FirebaseService from '../../services/firebase-service';
import {
  editNumOfCustomer,
  editPhoneNumber,
  editCustomerName,
  editBookingTime,
  editTimeIndex,
  prepareEditedValue,
  editBookingDate,
} from '../../actions/actions'
import {StackActions, NavigationActions} from 'react-navigation';
import Spinner from 'react-native-number-spinner';
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet,
  View,
  Alert,
  Text,
} from 'react-native';

class MyBookingEdit extends Component {
  static navigationOptions = {
    title: 'MyBookingEdit',
  }

  componentWillMount(){
    const {booking, restaurant} = this.props.MyBookingReducer;
    let selectedIndex = restaurant.sectionTime.indexOf(booking.timeText);
    this.props.prepareEditedValue(booking.dateText, booking.timeText,
      selectedIndex, booking.numOfCustomer, booking.phone, booking.customer);
  }

  onPressConfirm(){
    this.alertConfirmation();
  }

  alertConfirmation(){
    Alert.alert(
      'Alert',
      'Do you want to update this booking?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.updateBooking();
        }},
      ]
    );
  }

  updateBooking(){
    const {refId} = this.props.MyBookingReducer;
    const {
      editedNumOfCustomer,
      editedPhoneNumber,
      editedCustomerName,
      editedBookingDate,
      editedBookingTime,
    } = this.props.MyBookingReducer;
    const bookingsRef = FirebaseService.child('bookings').child('users').child('1').child(refId);
    bookingsRef.update({
      dateText: editedBookingDate,
      timeText: editedBookingTime,
      dateText_timeText: editedBookingDate+'_'+editedBookingTime,
      pressDate: new Date().toLocaleString(),
      numOfCustomer: editedNumOfCustomer,
      phone: editedPhoneNumber,
      customer: editedCustomerName,
    });
    Alert.alert('Update Success');
    this.redirectToMyBookingDetail();
  }

  redirectToMyBookingDetail(){
    const resetAction = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'MyBookingList' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  updateIndex(selectedIndex){
    const {restaurant} = this.props.MyBookingReducer;
    this.props.editTimeIndex(selectedIndex);
    this.props.editBookingTime(restaurant.sectionTime[selectedIndex]);
  }

  render() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date+'-'+month+'-'+year;
    const {booking, restaurant} = this.props.MyBookingReducer;
    const {
      editedNumOfCustomer,
      editedPhoneNumber,
      editedCustomerName,
      selectedIndex,
      editedBookingTime,
      editedBookingDate,
    } = this.props.MyBookingReducer;
    return (
      <View>
      <View style={styles.container}>
      <FormLabel>Date and time</FormLabel>
      <DatePicker
      style={styles.datePicker}
      date={editedBookingDate}
      mode="date"
      placeholder="select date"
      format="D-M-YYYY"
      minDate= {mindate}
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
          marginLeft: 56,
        }
      }}
      onDateChange={(dateText) => this.props.editBookingDate(dateText)}
      />

      <ButtonGroup
        onPress={this.updateIndex.bind(this)}
        buttons={restaurant.sectionTime}
        containerStyle={{height: 50}}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{backgroundColor: "tomato"}}
      />
      <FormLabel>People</FormLabel>
      <View style={{marginLeft: 20, marginTop:10}}>
      <Spinner
        value={editedNumOfCustomer}
        max = {10}
        min = {1}
        color= "tomato"
        fontSize = {16}
        onNumChange={(num)=> this.props.editNumOfCustomer(num)}
      />
      </View>
      <FormLabel>Phone number</FormLabel>
      <FormInput
      keyboardType = 'numeric'
      underlineColorAndroid="#ccc"
      value={editedPhoneNumber}
      onChangeText={(phone) => this.props.editPhoneNumber(phone)}
      />
      <FormLabel>Name</FormLabel>
      <FormInput
      underlineColorAndroid="#ccc"
      value={editedCustomerName}
      onChangeText={(customer) => this.props.editCustomerName(customer)}
      />
      </View>
      <Button
        title='Confirm'
        backgroundColor='tomato'
        onPress={this.onPressConfirm.bind(this)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePicker:{
    width: 200,
  },
  container:{
    backgroundColor:'white',
    margin: 10,
    borderRadius:10,
    padding: 5,
  },
});

function mapStateToProps (state) {
  return {
    MyBookingReducer: state.MyBookingReducer
  }
}

function mapDispatchToProps (dispatch){
  return{
    editBookingDate: (dateText) => dispatch(editBookingDate(dateText)),
    editBookingTime: (timeText) => dispatch(editBookingTime(timeText)),
    editNumOfChild: (numOfChild) => dispatch(editNumOfChild(numOfChild)),
    editNumOfCustomer: (numOfCustomer) => dispatch(editNumOfCustomer(numOfCustomer)),
    editPhoneNumber: (phone) => dispatch(editPhoneNumber(phone)),
    editCustomerName: (customer) => dispatch(editCustomerName(customer)),
    editTimeIndex: (selectedIndex) => dispatch(editTimeIndex(selectedIndex)),
    prepareEditedValue: (dateText, timeText, selectedIndex, numOfCustomer, phone, customer) =>
    dispatch(prepareEditedValue(dateText, timeText, selectedIndex, numOfCustomer, phone, customer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingEdit)
//export default MyBookingEdit;
