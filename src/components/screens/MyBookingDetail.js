'use strict';

import React, { Component } from 'react';
import { FormLabel, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMyQueue } from '../../actions/my-booking-action';

class MyBookingDetail extends Component {

  static navigationOptions = {
    title: 'MyBookingDetail',
  }

  componentWillMount() {
    const { booking } = this.props.MyBookingReducer;
    this.props.getMyQueue(booking.id, booking.dateText, booking.restaurantId, booking.timeText)
  }

  onPressMyQueue(bookingId, dateText, resId) {
    //getMyQueue(bookingId, dateText, resId);
    //console.log(bookingId, dateText, resId);
  }

  onPressEdit() {
    this.navigateToBookingEdit();
  }

  navigateToBookingEdit() {
    const { navigate } = this.props.navigation;
    navigate('MyBookingEdit');
  }

  render() {
    const { booking, restaurant, myQueue } = this.props.MyBookingReducer;
    //const myQueue = getMyQueue(booking.id, booking.dateText, booking.restaurantId)
    return (
      <View>
        <View style={styles.myQueue}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={styles.myQueueText}>My Queue : {myQueue}</Text>
            <Text>of round {booking.timeText}</Text>
          </View>
          {/* <Ionicons name='ios-refresh' size={35} color='tomato' onPress={()=>this.onPressMyQueue(booking.id, booking.dateText, booking.restaurantId)}/> */}
        </View>
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
          onPress={this.onPressEdit.bind(this)}
          title='Edit'
        />
        <Button
          title='Cancel Booking'
          backgroundColor='#ff0000'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 20,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  myQueue: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  myQueueText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 10,
  }
});

function mapStateToProps(state) {
  return {
    MyBookingReducer: state.MyBookingReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    preparedBookingDetail: (booking, refId) => dispatch(preparedBookingDetail(booking, refId)),
    getRestaurantById: (refId) => dispatch(getRestaurantById(refId)),
    getMyQueue: (bookingId, dateText, resId, timeText) => dispatch(getMyQueue(bookingId, dateText, resId, timeText))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyBookingDetail)
