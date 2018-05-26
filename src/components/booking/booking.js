'use strict';

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
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
    const item = navigation.getParam('item');
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Image
          style={styles.image}
          source={{uri: item.image}}
        />
        <Text>
          title: {item.title}
        </Text>
        <FormLabel>date/time</FormLabel>
        <FormInput
        value={this.state.dateText}
        onChangeText={(value) => this.setState({dateText:value})}
        />
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
              item: item,
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

  }
});


export default Booking;
