'use strict';

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class Booking extends Component {
  static navigationOptions = {
    title: 'Booking',
  };

  constructor(props) {
    super(props);

    this.state = {
      dateText: '',
      numOfCustomer: '',
      customerName:'',
      phoneNumber: '',
    };
  }

  render() {
    const {navigation} = this.props;
    const restaurant = navigation.getParam('restaurant');
    const {navigate} = this.props.navigation;
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let mindate = date+'-'+month+'-'+year;
    return (
      <View>
        <Image
          style={styles.image}
          source={{uri: restaurant.image}}
        />
        <Text>
          title: {restaurant.title}
        </Text>
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
            marginLeft: 56
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dateText) => {this.setState({dateText: dateText})}}
        >
        </DatePicker>
        <FormLabel>People</FormLabel>
        <FormInput
        keyboardType = 'numeric'
        value={this.state.numOfCustomer}
        onChangeText={(value) => this.setState({numOfCustomer:value})}
        />
        <FormLabel>Phone number</FormLabel>
        <FormInput
        keyboardType = 'numeric'
        value={this.state.phoneNumber}
        onChangeText={(value) => this.setState({phoneNumber:value})}
        />
        <FormLabel>Name</FormLabel>
        <FormInput
        value={this.state.customerName}
        onChangeText={(value) => this.setState({customerName:value})}
        />
        <Button
          style={styles.button}
          title='Next'
          onPress={()=>{
            navigate('BookingConfirm',{
              dateText: this.state.dateText,
              numOfCustomer: this.state.numOfCustomer,
              phoneNumber: this.state.phoneNumber,
              customerName: this.state.customerName,
              restaurant: restaurant,
            });
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    flexGrow: 1,
    width:'100%',
    height:100,
  },
  button:{

  },
  datePicker:{
    width: 200,
  }
});


export default Booking;
