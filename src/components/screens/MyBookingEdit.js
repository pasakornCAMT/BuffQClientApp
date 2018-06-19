'use strict';

import React, { Component } from 'react';
import {FormLabel, FormInput, Button} from 'react-native-elements'
import {connect} from 'react-redux';
import FirebaseService from '../../services/firebase-service';
import {editNumOfCustomer, editPhoneNumber, editCustomerName} from '../../actions/actions'
import {StackActions, NavigationActions} from 'react-navigation';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';

class MyBookingEdit extends Component {
  static navigationOptions = {
    title: 'MyBookingEdit',
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
    } = this.props.MyBookingReducer;
    const bookingsRef = FirebaseService.child('bookings').child(refId);
    bookingsRef.update({
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

  render() {
    const {booking} = this.props.MyBookingReducer;
    const {
      editedNumOfCustomer,
      editedPhoneNumber,
      editedCustomerName,
    } = this.props.MyBookingReducer;
    return (
      <View>
      <View style={styles.container}>
      <FormLabel>People</FormLabel>
      <FormInput
      keyboardType = 'numeric'
      underlineColorAndroid="#ccc"
      value={editedNumOfCustomer}
      onChangeText={(numOfCustomer) => this.props.editNumOfCustomer(numOfCustomer)}
      />
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
        //onPress={this.onPressConfirm.bind(this)}
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
    editNumOfCustomer: (numOfCustomer) => dispatch(editNumOfCustomer(numOfCustomer)),
    editPhoneNumber: (phone) => dispatch(editPhoneNumber(phone)),
    editCustomerName: (customer) => dispatch(editCustomerName(customer)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingEdit)
//export default MyBookingEdit;
