'use strict';
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
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

class BookingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateText: '',
      numOfCustomer: '',
      customerName: '',
      phoneNumber: '',
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.timeButtons = ['17:00', '18:00', '19:00','20:00','21:00','22:00'];
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    this.props.onSelectButton(this.timeButtons[this.state.selectedIndex]);
  }

  render() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date+'-'+month+'-'+year;
    const { selectedIndex } = this.state;
    const {restaurant} = this.props;
    return (
      <View>
      <View style={styles.container}>
        <FormLabel>Select date</FormLabel>
        <DatePicker
        style={styles.datePicker}
        date={this.state.dateText}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate= {mindate}
        //maxDate="2016-06-01"
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
        onDateChange={(dateText) => {this.setState({dateText: dateText})}}
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
          value={this.state.numOfCustomer}
          onChangeText={(num) => this.setState({numOfCustomer:num})}
          />
          <FormLabel>Phone number</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          keyboardType = 'numeric'
          value={this.state.phoneNumber}
          onChangeText={(num) => this.setState({phoneNumber:num})}
          />
          <FormLabel>Name</FormLabel>
          <FormInput
          underlineColorAndroid="#ccc"
          value={this.state.customerName}
          onChangeText={(value) => this.setState({customerName:value})}
          />
          <Text style={styles.priceText}>
            Price: {restaurant.price*this.state.numOfCustomer}
          </Text>
      </View>
      <Button
        style={styles.button}
        backgroundColor = 'tomato'
        title='Next'
        onPress={()=>{
          this.props.onPressNext(
            this.state.dateText,
            this.state.numOfCustomer,
            this.state.phoneNumber,
            this.state.customerName,
            this.timeButtons[this.state.selectedIndex],
            restaurant
          )
        }}
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
  image:{
    flexGrow: 1,
    width:'100%',
    height:100,
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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


export default BookingForm;
