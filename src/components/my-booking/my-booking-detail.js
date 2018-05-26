'use strict';

import React, { Component } from 'react';
import {FormLabel, Button} from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class MyBookingDetail extends Component {
  static navigationOptions = {
    title: 'MyBookingDetail',
  };
  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const item = navigation.getParam('item');
    return (
      <View>
        <FormLabel>restaurant</FormLabel>
        <Text style={styles.text} >{item.resName}</Text>

        <FormLabel>date/time</FormLabel>
        <Text style={styles.text} >{item.dateText}</Text>

        <FormLabel>people</FormLabel>
        <Text style={styles.text} >{item.numOfCustomer}</Text>

        <FormLabel>name</FormLabel>
        <Text style={styles.text} >{item.customer}</Text>

        <Button
          onPress = {()=>{
            navigate('MyBookingUpdate');
          }}
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
  },
});


export default MyBookingDetail;
