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
  fillPhoneNumber,
  fillCustomerName,
  checkedDrink,
  recordPrice,
} from '../../actions/actions'
import Spinner from 'react-native-number-spinner';

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
      drink,
    } = this.props.bookingForm
    const {restaurant} = this.props.restaurants;
    return (
      <View style={styles.paddingSpace}>
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
          buttons={restaurant.sectionTime}
          containerStyle={{height: 50}}
          selectedIndex={selectedIndex}
          />
          <View style={styles.people}>
          <Text style={styles.peopleText}>
            Adult:
          </Text>
          <Spinner
            value = {numOfCustomer}
            max = {10}
            min = {1}
            color="tomato"
            fontSize = {16}
            onNumChange={(num)=> this.props.fillNumOfCustomer(num)}
          />
          {
            restaurant.childPrice ? (
              <View style={styles.childBox}>
              <Text style={styles.peopleText}>
                Child:
              </Text>
              <Spinner
                value = {0}
                max = {10}
                min = {0}
                color="#99f"
                fontSize = {16}
              />
              </View>
            ): null
          }
          </View>
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
            <Text style={styles.priceText}>
              Price: {(restaurant.price+restaurant.drink)*numOfCustomer} THB
            </Text>
          ):(
            <Text style={styles.priceText}>
              Price: {restaurant.price*numOfCustomer} THB
            </Text>
          )
        }
      </View>
      <Button
        style={styles.button}
        backgroundColor = 'tomato'
        title='Next'
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
    fillPhoneNumber: (phoneNumber) => dispatch(fillPhoneNumber(phoneNumber)),
    fillCustomerName: (customerName) => dispatch(fillCustomerName(customerName)),
    recordPrice: (price) => dispatch(recordPrice(price)),
    checkedDrink: () => dispatch(checkedDrink()),
    fetchingEstimatedTimeTable: (id, timeText) => dispatch(fetchingEstimatedTimeTable(id, timeText)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm)
//export default BookingForm;
