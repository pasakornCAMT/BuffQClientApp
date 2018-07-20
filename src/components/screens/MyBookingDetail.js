'use strict';

import React, { Component } from 'react';
import {FormLabel, Button} from 'react-native-elements'
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class MyBookingDetail extends Component {

  static navigationOptions = {
    title: 'MyBookingDetail',
  }

  onPressEdit(){
    this.navigateToBookingEdit();
  }

  navigateToBookingEdit(){
    const {navigate} = this.props.navigation;
    navigate('MyBookingEdit');
  }

  render() {
    const {booking, restaurant} = this.props.MyBookingReducer;
    return (
      <View>
      <View style={styles.container}>
        <FormLabel>Restaurant</FormLabel>
        <Text style={styles.text}>{booking.restaurant}</Text>

        <FormLabel>Booking date</FormLabel>
        <Text style={styles.text} >{booking.dateText}</Text>

        <FormLabel>Booking time</FormLabel>
        <Text style={styles.text} >{booking.timeText}</Text>

        <FormLabel>People</FormLabel>
        <Text style={styles.text} >{booking.numOfCustomer}</Text>

        <FormLabel>Total Price</FormLabel>
        <Text style={styles.text} >{booking.totalPrice} THB</Text>

        <FormLabel>Name</FormLabel>
        <Text style={styles.text} >{booking.customer}</Text>
      </View>
        <Button
          onPress = {this.onPressEdit.bind(this)}
          title = 'Edit'
        />
        <Button
          title = 'Cancel'
          backgroundColor = '#ff0000'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    marginLeft: 20,
    fontSize: 16,
  },
  container:{
    backgroundColor: 'white',
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

export default connect(mapStateToProps)(MyBookingDetail)
