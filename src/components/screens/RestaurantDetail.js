'use strict';

import React, { Component } from 'react';
import HeaderImage from '../main-components/HeaderImage';
import BookingForm from '../main-components/BookingForm';
import EstimatedTimeTable from '../main-components/EstimatedTimeTable';
import RestaurantDescription from '../main-components/RestaurantDescription';
import {fetchingEstimatedTimeTable} from '../../actions/actions';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

class RestaurantDetail extends Component {

  static navigationOptions = {
    title: 'RestaurantDetail',
  }

  onPressNext(){
    const {navigate} = this.props.navigation;
    navigate('BookingConfirm');
  }

  componentWillMount(){
    const {refId} = this.props.restaurants;
    const {timeText} = this.props.bookingForm;
    this.props.fetchingEstimatedTimeTable(refId, timeText);
  }

  render() {
    const {navigation} = this.props;
    const {restaurant} = this.props.restaurants;
    const {timeText} = this.props.bookingForm;
    return (
      <View>
      <ScrollView>
        <HeaderImage/>
        <EstimatedTimeTable id={restaurant.id} timeText={timeText}/>
        <BookingForm onPressNext={this.onPressNext.bind(this)}/>
        <RestaurantDescription id={restaurant.id}/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants,
    bookingForm: state.bookingForm,
    estimatedTimeTable: state.estimatedTimeTable,
  }
}

function mapDispatchToProps (dispatch) {
  return{
    fetchingEstimatedTimeTable: (id, timeText) => dispatch(fetchingEstimatedTimeTable(id, timeText))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail)
//export default RestaurantDetail;
