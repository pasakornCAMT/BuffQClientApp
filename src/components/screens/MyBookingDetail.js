'use strict';

import React, { Component } from 'react';
import {FormLabel, Button} from 'react-native-elements'
import {connect} from 'react-redux';
import {prepareEditedValue} from '../../actions/actions'
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
    const {booking} = this.props.MyBookingReducer;
    this.props.prepareEditedValue(booking.numOfCustomer, booking.phone, booking.customer);
    const {navigate} = this.props.navigation;
    navigate('MyBookingEdit');
  }

  render() {
    const {booking} = this.props.MyBookingReducer;
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
          //onPress = {this.onPressEdit.bind(this)}
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

function mapDispatchToProps (dispatch){
  return{
    prepareEditedValue: (numOfCustomer, phone, customer) => dispatch(prepareEditedValue(numOfCustomer, phone, customer))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBookingDetail)
//export default MyBookingDetail;
