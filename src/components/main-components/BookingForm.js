'use strict';
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {fetchingEstimatedTimeTable} from '../../actions/actions'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  ButtonGroup
} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fillDate,
  fillTime,
  fillNumOfCustomer,
  fillPhoneNumber,
  fillCustomerName,
} from '../../actions/actions'

class BookingForm extends Component {

  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this);
    this.timeButtons = ['17:00', '18:00', '19:00','20:00','21:00','22:00'];
  }

  updateIndex (selectedIndex) {
    const {refId} = this.props.restaurants;
    this.props.fillTime(selectedIndex,this.timeButtons[selectedIndex]);
    this.props.fetchingEstimatedTimeTable(refId, this.timeButtons[selectedIndex]);
  }

  render() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date+'-'+month+'-'+year;
    const {
      dateText,
      timeText,
      selectedIndex,
      numOfCustomer,
      phoneNumber,
      customerName,
    } = this.props.bookingForm
    const {restaurant} = this.props.restaurants;
    return (
      <View>
      <View style={styles.container}>
        <FormLabel>Select date</FormLabel>
        <DatePicker
        style={styles.datePicker}
        date={dateText}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
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
        // ... You can check the source to find the other keys.
        }}
        onDateChange={(dateText) => this.props.fillDate(dateText)}
        >
        </DatePicker>
        <ButtonGroup
          onPress={this.updateIndex}
          buttons={this.timeButtons}
          containerStyle={{height: 50}}
          selectedIndex={selectedIndex}
          />
          <FormLabel>People</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          keyboardType = 'numeric'
          value={numOfCustomer}
          onChangeText={(numOfCustomer) =>  this.props.fillNumOfCustomer(numOfCustomer)}
          />
          <FormLabel>Phone number</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          keyboardType = 'numeric'
          value={phoneNumber}
          onChangeText={(phoneNumber) =>  this.props.fillPhoneNumber(phoneNumber)}
          />
          <FormLabel>Name</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          value={customerName}
          onChangeText={(customerName) =>  this.props.fillCustomerName(customerName)}
          />
          <Text style={styles.priceText}>
            Price: {restaurant.price*numOfCustomer}
          </Text>
      </View>
      <Button
        style={styles.button}
        backgroundColor = 'tomato'
        title='Next'
        onPress={this.props.onPressNext}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    margin: 10,
    borderRadius:10,
  },
  datePicker:{
    width: 200,
  },
  timeButton:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleText:{
    fontSize: 32,
    color: 'white',
    marginTop: 60,
  },
  priceText:{
    fontSize: 32,
    marginLeft:20,
  }
});

function mapStateToProps (state) {
  return {
    bookingForm: state.bookingForm,
    restaurants: state.restaurants,
  }
}

function mapDispatchToProps (dispatch) {
  return{
    fillDate: (dateText) => dispatch(fillDate(dateText)),
    fillTime: (selectedIndex, timeText) => dispatch(fillTime(selectedIndex, timeText)),
    fillNumOfCustomer: (numOfCustomer) => dispatch(fillNumOfCustomer(numOfCustomer)),
    fillPhoneNumber: (phoneNumber) => dispatch(fillPhoneNumber(phoneNumber)),
    fillCustomerName: (customerName) => dispatch(fillCustomerName(customerName)),
    fetchingEstimatedTimeTable: (id, timeText) => dispatch(fetchingEstimatedTimeTable(id, timeText)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm)
//export default BookingForm;
