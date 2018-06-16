'use strict';

import React, { Component } from 'react';
import {FormLabel, Button} from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class MyBookingDetail extends Component {
  static navigationOptions = {
    title: 'MyBookingDetail',
  };
  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const booking = navigation.getParam('booking');
    return (
      <View>
      <View style={styles.container}>
        <FormLabel>restaurant</FormLabel>
        <Text style={styles.text} >{booking.restaurant}</Text>

        <FormLabel>date/time</FormLabel>
        <Text style={styles.text} >{booking.dateText}</Text>

        <FormLabel>people</FormLabel>
        <Text style={styles.text} >{booking.numOfCustomer}</Text>

        <FormLabel>name</FormLabel>
        <Text style={styles.text} >{booking.customer}</Text>
      </View>
        <Button
          onPress = {()=>{
            navigate('MyBookingUpdate',{
              booking: booking,
            });
          }}
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
  },
  container:{
    backgroundColor: 'white',
    margin: 10,
    borderRadius:10,
    padding: 5,
  },
});


export default MyBookingDetail;
