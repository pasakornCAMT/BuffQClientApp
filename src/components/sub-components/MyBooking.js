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
    const refId = this.props.rowId;
    return (
      <TouchableHighlight onPress={() => {
        this.props.onPress(booking, refId, booking.restaurantId);
      }}>
        <View style={styles.li}>
          <Image
            style={styles.image}
            source={{ uri: booking.resImage }}
          />
          <View style={styles.liRight}>
            <Text style={styles.liText}>
              {booking.restaurant}
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
            <Text style={styles.pressDateText}>
                {booking.pressDate}
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
    padding: 5,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: '100%',
    paddingVertical: 5,
  },
  liText: {
    color: '#333',
    fontSize: 12,
    marginLeft: 6,
  },

  liRight: {
    flexDirection: 'column',
  },
  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressDateText:{
    fontSize: 10,
    marginLeft: 6,
  }
});


export default MyBooking;
