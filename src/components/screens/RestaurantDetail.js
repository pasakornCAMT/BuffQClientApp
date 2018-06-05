'use strict';

import React, { Component } from 'react';
import HeaderImage from '../main-components/HeaderImage';
import BookingForm from '../main-components/BookingForm';
import FirebaseService from '../../services/firebase-service';
import EstimatedTimeTable from '../main-components/EstimatedTimeTable';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeText: '17:00',
    };
  }
  static navigationOptions = {
    title: 'RestaurantDetail',
  };
  onPressNext(dateText, numOfCustomer, phoneNumber, customerName, timeText, restaurant){
    const {navigate} = this.props.navigation;
    navigate('BookingConfirm',{
      dateText: dateText,
      numOfCustomer: numOfCustomer,
      phoneNumber: phoneNumber,
      customerName: customerName,
      timeText: timeText,
      restaurant: restaurant,
    });
  }
  onSelectButton(timeText){
    this.state.timeText = timeText;
  }
  render() {
    const {navigation} = this.props;
    const restaurant = navigation.getParam('restaurant');
    const estimatedTimeRef = FirebaseService.child('items')
    .child(restaurant._key).child('EstimatedTime').child(this.state.timeText);
    return (
      <View>
      <ScrollView>
        <HeaderImage restaurant = {restaurant}/>
        <BookingForm
          restaurant = {restaurant}
          onPressNext={this.onPressNext.bind(this)}
          onSelectButton={this.onSelectButton.bind(this)}
        />
        <EstimatedTimeTable estimatedTimeRef={estimatedTimeRef}/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default RestaurantDetail;
