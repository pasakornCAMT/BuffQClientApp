'use strict';
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  ButtonGroup,
  CheckBox,
  Icon,
} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchingEstimatedTimeTable,
  fillDate,
  fillTime,
  fillNumOfCustomer,
  fillNumOfChild,
  fillPhoneNumber,
  fillCustomerName,
  checkedDrink,
  checkNumOfCustomer,
} from '../../actions/actions'
import Spinner from 'react-native-number-spinner';

class BookingForm extends Component {

  updateIndex (selectedIndex) {
    const {sectionTime} = this.props.restaurants.restaurant;
    const {refId} = this.props.restaurants;
    const {dateText, numOfCustomer} = this.props.bookingForm;
    this.props.fillTime(selectedIndex, sectionTime[selectedIndex]);
    this.props.fetchingEstimatedTimeTable(refId, sectionTime[selectedIndex]);
    this.props.checkNumOfCustomer(refId, dateText, sectionTime[selectedIndex],numOfCustomer);
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
      numOfChild,
      phoneNumber,
      customerName,
      drink,
      isDateText,
      isPhoneNumber,
      isCustomerName,
    } = this.props.bookingForm
    const {restaurant, isFull} = this.props.restaurants;
    return (
      <View style={styles.paddingSpace}>
      <View style={styles.container}>
        <FormLabel>Select date</FormLabel>
        <DatePicker
        style={styles.datePicker}
        date={dateText}
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
        // ... You can check the source to find the other keys.
        }}
        onDateChange={(dateText) => this.props.fillDate(dateText)}
        >
        </DatePicker>
        {
          dateText.length == 0 ? (
            <FormValidationMessage>{'Please, Select date.'}</FormValidationMessage>
          ):null
        }
        <ButtonGroup
          onPress={this.updateIndex.bind(this)}
          buttons={restaurant.sectionTime}
          containerStyle={{height: 50}}
          selectedIndex={selectedIndex}
          selectedButtonStyle={{backgroundColor: "tomato"}}
        />
        {
          isFull ? (
            <Text style={styles.warningMes}>
              This time is not unavailable.
            </Text>
          ):null
        }
          <View style={styles.people}>
          {
            restaurant.childPrice ? (
              <View style={styles.childBox}>
              <Text style={styles.peopleText}>
                Adult:
              </Text>
              <Spinner
                value = {numOfCustomer}
                max = {10}
                min = {1}
                color="#39f"
                fontSize = {16}
                onNumChange={(num)=> this.props.fillNumOfCustomer(num)}
              />
              <Text style={styles.peopleText}>
                Child:
              </Text>
              <Spinner
                value = {numOfChild}
                max = {10}
                min = {0}
                color="#99f"
                fontSize = {16}
                onNumChange={(num)=> this.props.fillNumOfChild(num)}
              />
              </View>
            ) : (
              <View style={styles.childBox}>
              <Text style={styles.peopleText}>
                People:
              </Text>
              <Spinner
                value = {numOfCustomer}
                max = {10}
                min = {1}
                color="tomato"
                fontSize = {16}
                onNumChange={(num)=> this.props.fillNumOfCustomer(num)}
              />
              </View>
            )
          }
          </View>
          <FormLabel>Phone number</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          keyboardType = 'numeric'
          value={phoneNumber}
          onChangeText={(phoneNumber) =>  this.props.fillPhoneNumber(phoneNumber)}
          />
          {
            phoneNumber == 0 ? (
              <FormValidationMessage>{'Customer’s phone number cannot be empty'}</FormValidationMessage>
            ):null
          }
          <FormLabel>Name</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          value={customerName}
          onChangeText={(customerName) =>  this.props.fillCustomerName(customerName)}
          />
          {
            customerName == 0 ? (
              <FormValidationMessage>{'Customer’s name cannot be empty'}</FormValidationMessage>
            ):null
          }
          {
            restaurant.drink ? (
              <View>
              <CheckBox
                title='Including a drink'
                checked={drink}
                checkedColor='tomato'
                onPress={this.props.checkedDrink}
              />
              </View>
            ): null
          }
          {
            drink ? (
              <Text style={{marginLeft: 10}}>
                +{restaurant.drink} THB per each
              </Text>
            ):null
          }
      </View>
      <View>
        {
          drink ? (
              restaurant.childPrice ? (
                <Text style={styles.priceText}>
                  Price: {(restaurant.price+restaurant.drink)*numOfCustomer+(numOfChild*restaurant.childPrice)} THB
                </Text>
              ):(
                <Text style={styles.priceText}>
                  Price: {(restaurant.price+restaurant.drink)*numOfCustomer} THB
                </Text>
              )
          ):(
            restaurant.childPrice ? (
              <Text style={styles.priceText}>
                Price: {restaurant.price*numOfCustomer+(numOfChild*restaurant.childPrice)} THB
              </Text>
            ):(
              <Text style={styles.priceText}>
                Price: {restaurant.price*numOfCustomer} THB
              </Text>
            )
          )
        }
      </View>
      <Button
        style={styles.button}
        backgroundColor = 'tomato'
        title='Next'
        disabled={isFull}
        onPress={
          this.props.onPressNext
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    margin: 5,
    borderRadius:10,
    paddingBottom: 10,
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
    color: 'tomato'
  },
  paddingSpace:{
    paddingBottom: 10,
  },
  people:{
    flexDirection: 'row',
    margin: 10,
  },
  peopleText:{
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  childBox:{
    flexDirection: 'row',
  },
  warningMes:{
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
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
    fillNumOfCustomer: (num) => dispatch(fillNumOfCustomer(num)),
    fillNumOfChild: (num) => dispatch(fillNumOfChild(num)),
    fillPhoneNumber: (phoneNumber) => dispatch(fillPhoneNumber(phoneNumber)),
    fillCustomerName: (customerName) => dispatch(fillCustomerName(customerName)),
    checkedDrink: () => dispatch(checkedDrink()),
    fetchingEstimatedTimeTable: (id, timeText) => dispatch(fetchingEstimatedTimeTable(id, timeText)),
    checkNumOfCustomer: (resId, dateText, timeText, customer) => dispatch(checkNumOfCustomer(resId, dateText, timeText, customer)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm)
//export default BookingForm;
