'use strict';

import React, { Component } from 'react';
import { FormLabel, FormInput, Button, ButtonGroup, CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import FirebaseService from '../../services/firebase-service';
import {
  editNumOfCustomer,
  editPhoneNumber,
  editCustomerName,
  editBookingTime,
  editTimeIndex,
  prepareEditedValue,
  editBookingDate,
  editNumOfAdult,
  editNumOfChild,
  editIncludeDrink,
  totalPriceChanged,
} from '../../actions/my-booking-action'
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-number-spinner';
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
} from 'react-native';

class MyBookingEdit extends Component {

  static navigationOptions = {
    title: 'MyBookingEdit',
  }

  componentWillMount() {
    const { booking, restaurant } = this.props.MyBookingReducer;
    let selectedIndex = restaurant.sectionTime.indexOf(booking.timeText);
    this.props.prepareEditedValue(booking.dateText, booking.timeText,
      selectedIndex, booking.numOfCustomer, booking.numOfAdult, booking.numOfChild,
      booking.phone, booking.customer, booking.includeDrink);
  }

  onPressConfirm() {
    this.alertConfirmation();
  }

  alertConfirmation() {
    Alert.alert(
      'Alert',
      'Do you want to update this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.updateBooking();
          }
        },
      ]
    );
  }

  updateBooking() {
    const { refId , restaurant} = this.props.MyBookingReducer;
    const {
      editedNumOfCustomer,
      editedNumOfAdult,
      editedNumOfChild,
      editedPhoneNumber,
      editedCustomerName,
      editedBookingDate,
      editedBookingTime,
      editedIncludeDrink,
      totalPriceChanged,
    } = this.props.MyBookingReducer;
    const bookingsRef = FirebaseService.database().ref().child('bookings').child('users').child('1').child(refId);
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let pressDate = days[new Date().getDay()]+' '+date+'-'+month+'-'+year+' '+hours+':'+min;
    let totalPrice = 0;
    if(editedIncludeDrink){
      if(restaurant.childPrice){
        totalPrice = (restaurant.price + restaurant.drink) * editedNumOfAdult + (editedNumOfChild * restaurant.childPrice)
      }else{
        totalPrice = (restaurant.price + restaurant.drink) * editedNumOfCustomer
      }
    }else{
      if(restaurant.childPrice){
        totalPrice = restaurant.price * editedNumOfAdult + (editedNumOfChild * restaurant.childPrice)
      }else{
        totalPrice = restaurant.price * editedNumOfCustomer
      }
    }
    const booking = {
      dateText: editedBookingDate,
      timeText: editedBookingTime,
      dateText_timeText: editedBookingDate + '_' + editedBookingTime,
      pressDate: pressDate,
      numOfCustomer: editedNumOfCustomer,
      phone: editedPhoneNumber,
      customer: editedCustomerName,
      totalPrice: totalPrice,
    }
    if(restaurant.childPrice){
      booking.numOfCustomer = editedNumOfAdult+editedNumOfChild,
      booking.numOfAdult = editedNumOfAdult,
      booking.numOfChild = editedNumOfChild
    }
    if(restaurant.drink){
      booking.includeDrink = editedIncludeDrink;
    }
    bookingsRef.update(booking);
    Alert.alert('Update Success');
    this.redirectToMyBookingDetail();
  }

  redirectToMyBookingDetail() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'MyBookingList' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  updateIndex(selectedIndex) {
    const { restaurant } = this.props.MyBookingReducer;
    this.props.editTimeIndex(selectedIndex);
    this.props.editBookingTime(restaurant.sectionTime[selectedIndex]);
  }

  render() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date + '-' + month + '-' + year;
    const { booking, restaurant } = this.props.MyBookingReducer;
    const {
      editedNumOfCustomer,
      editedNumOfAdult,
      editedNumOfChild,
      editedPhoneNumber,
      editedCustomerName,
      selectedIndex,
      editedBookingDate,
      editedIncludeDrink,
    } = this.props.MyBookingReducer;

    let totalPrice = 0;
    if(editedIncludeDrink){
      if(restaurant.childPrice){
        totalPrice = (restaurant.price + restaurant.drink) * editedNumOfAdult + (editedNumOfChild * restaurant.childPrice)
      }else{
        totalPrice = (restaurant.price + restaurant.drink) * editedNumOfCustomer
      }
    }else{
      if(restaurant.childPrice){
        totalPrice = restaurant.price * editedNumOfAdult + (editedNumOfChild * restaurant.childPrice)
      }else{
        totalPrice = restaurant.price * editedNumOfCustomer
      }
    }
    return (
      <View style={styles.paddingSpace}>
        <ScrollView>
        <View style={styles.container}>
          <FormLabel>Date and time</FormLabel>
          <DatePicker
            style={styles.datePicker}
            date={editedBookingDate}
            mode="date"
            placeholder="select date"
            format="D-M-YYYY"
            minDate={mindate}
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
            containerStyle={{ height: 50 }}
            selectedIndex={selectedIndex}
            selectedButtonStyle={{ backgroundColor: "tomato" }}
          />
          <View style={styles.people}>
            {
              restaurant.childPrice ? (
                <View style={styles.childBox}>
                  <Text style={styles.peopleText}>
                    Adult:
                  </Text>
                  <Spinner
                    value={editedNumOfAdult}
                    max={10}
                    min={1}
                    color="#39f"
                    fontSize={16}
                    onNumChange={(num) => this.props.editNumOfAdult(num)}
                  />
                  <Text style={styles.peopleText}>
                    Child:
                  </Text>
                  <Spinner
                    value={editedNumOfChild}
                    max={10}
                    min={0}
                    color="#99f"
                    fontSize={16}
                    onNumChange={(num) => this.props.editNumOfChild(num)}
                  />
                </View>
              ) : (
                  <View style={styles.childBox}>
                    <Text style={styles.peopleText}>
                      People:
                    </Text>
                    <Spinner
                      value={editedNumOfCustomer}
                      max={10}
                      min={1}
                      color="tomato"
                      fontSize={16}
                      onNumChange={(num) => this.props.editNumOfCustomer(num)}
                    />
                  </View>
                )
            }
          </View>
          <FormLabel>Phone number</FormLabel>
          <FormInput
            keyboardType='numeric'
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
          {
            restaurant.drink ? (
              <View>
                <CheckBox
                  title='Including a drink'
                  checked={editedIncludeDrink}
                  checkedColor='tomato'
                  onPress={this.props.editIncludeDrink}
                />
              </View>
            ) : null
          }
          {
            editedIncludeDrink ? (
              <Text style={{ marginLeft: 10 }}>
                +{restaurant.drink} THB per each
              </Text>
            ) : null
          }
        </View>
        <View>
          <Text style={styles.priceText}>
            Price: {totalPrice} THB
          </Text>
        </View>
        <Button
          title='Confirm'
          backgroundColor='tomato'
          onPress={this.onPressConfirm.bind(this)}
        />
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    width: 200,
    marginVertical: 5,
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  people: {
    flexDirection: 'row',
    margin: 10,
  },
  peopleText: {
    fontWeight: 'bold',
    fontSize: 12,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  childBox: {
    flexDirection: 'row',
  },
  priceText: {
    fontSize: 32,
    marginLeft: 20,
    color: 'tomato'
  },
  paddingSpace: {
    paddingBottom: 10,
  },
});

function mapStateToProps(state) {
  return {
    MyBookingReducer: state.MyBookingReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editBookingDate: (dateText) => dispatch(editBookingDate(dateText)),
    editBookingTime: (timeText) => dispatch(editBookingTime(timeText)),
    editNumOfChild: (numOfChild) => dispatch(editNumOfChild(numOfChild)),
    editNumOfCustomer: (numOfCustomer) => dispatch(editNumOfCustomer(numOfCustomer)),
    editNumOfAdult: (numOfAdult) => dispatch(editNumOfAdult(numOfAdult)),
    editPhoneNumber: (phone) => dispatch(editPhoneNumber(phone)),
    editCustomerName: (customer) => dispatch(editCustomerName(customer)),
    editTimeIndex: (selectedIndex) => dispatch(editTimeIndex(selectedIndex)),
    editIncludeDrink: () => dispatch(editIncludeDrink()),
    totalPriceChanged: (totalPrice) => dispatch(totalPriceChanged(totalPrice)),
    prepareEditedValue: (dateText, timeText, selectedIndex, numOfCustomer, numOfAdult, 
      numOfChild, phone, customer, includeDrink ) =>
      dispatch(prepareEditedValue(dateText, timeText, selectedIndex, numOfCustomer, numOfAdult, 
        numOfChild, phone, customer, includeDrink))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingEdit)
