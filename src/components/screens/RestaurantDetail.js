'use strict';

import React, { Component } from 'react';
import HeaderImage from '../main-components/HeaderImage';
import BookingForm from '../main-components/BookingForm';
import FirebaseService from '../../services/firebase-service';
import EstimatedTimeTable from '../main-components/EstimatedTimeTable';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
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
  onPressNext(){
    const {navigate} = this.props.navigation;
    navigate('BookingConfirm');
  }
  onSelectButton(timeText){
    this.state.timeText = timeText;
  }
  render() {
    const {navigation} = this.props;
    const {restaurant} = this.props.restaurants;
    //const restaurant = navigation.getParam('restaurant');
    // const estimatedTimeRef = FirebaseService.child('items')
    // .child(restaurant.key).child('EstimatedTime').child(this.state.timeText);
    return (
      <View>
      <ScrollView>
        <HeaderImage/>
        //<BookingForm/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(RestaurantDetail)
//export default RestaurantDetail;
