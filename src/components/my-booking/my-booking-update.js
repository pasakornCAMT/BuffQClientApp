'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';

class MyBookingUpdate extends Component {
  static navigationOptions = {
    title: 'MyBookingUpdate',
  };
  render() {
    return (
      <View>
        <Text>
          Update
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default MyBookingUpdate;
