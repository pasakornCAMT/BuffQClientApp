'use strict';

import React, { Component } from 'react';
import RestaurantListView from '../main-components/RestaurantListView';

import {
  StyleSheet,
  View,
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  pressRow(restaurant){
    const {navigate} = this.props.navigation;
    navigate('RestaurantDetail',{
      restaurant:restaurant
    });
  }

  render() {
    return (
      <RestaurantListView onPress={this.pressRow.bind(this)}/>
    );
  }
}

const styles = StyleSheet.create({

});


export default Home;
