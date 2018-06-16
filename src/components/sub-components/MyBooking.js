'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';

class MyBooking extends Component {
  render() {
    const booking = this.props.data;
    return (
      <TouchableHighlight onPress={()=>{
        this.props.onPress(booking);
      }}>
      <View style={styles.li}>
        <Image
          style={styles.image}
          source={{uri: booking.resImage}}
          />
        <View style={styles.liRight}>
          <Text style={styles.liText}>
            {booking.resName}
          </Text>
          <Text style={styles.liText}>
            {booking.dateText}
          </Text>
          <Text style={styles.liText}>
            {booking.timeText}
          </Text>
          <Text style={styles.liText}>
            {booking.numOfCustomer} people
          </Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  image:{
    width:150,
    height:100,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 6,
  },

  liRight: {
    flexDirection: 'column',
  }
});


export default MyBooking;
