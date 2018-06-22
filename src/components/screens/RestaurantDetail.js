'use strict';

import React, { Component } from 'react';
import HeaderImage from '../main-components/HeaderImage';
import BookingForm from '../main-components/BookingForm';
import EstimatedTimeTable from '../main-components/EstimatedTimeTable';
import RestaurantDescription from '../main-components/RestaurantDescription';
import {
  fetchingEstimatedTimeTable,
  recordPrice,
  checkNumOfCustomer,
  validateDate,
  validatePhone,
  validateName,
} from '../../actions/actions';
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
    this.recordPrice();
    this.navigateToBookingConfirm();
  }

  navigateToBookingConfirm(){
    console.log(this.validateBookingForm());
    const {navigate} = this.props.navigation;
    navigate('BookingConfirm');
  }

  validateBookingForm(){
    const {
      dateText,
      phoneNumber,
      customerName,
      isDateText,
      isPhoneNumber,
      isCustomerName,
    } = this.props.bookingForm;
    if(dateText.length != 0){
      this.props.validateDate();
    }
    if(phoneNumber.length != 0){
      this.props.validatePhone();
    }
    if(customerName.length != 0){
      this.props.validateName();
    }
    console.log('date', dateText.length);
    console.log('phone',  phoneNumber.length );
    console.log('name', customerName.length);
    console.log('date', isDateText);
    console.log('phone',  isPhoneNumber );
    console.log('name', isCustomerName);
    if(isDateText && isPhoneNumber && isCustomerName){
      return true;
    }else{
      return false;
    }
  }

  recordPrice(){
    const {price, drink, childPrice} = this.props.restaurants.restaurant;
    const {numOfCustomer, numOfChild} = this.props.bookingForm;
    if(this.props.bookingForm.drink){
      if(childPrice){
        this.props.recordPrice((price+drink)*numOfCustomer+(numOfChild*childPrice));
      }else{
        this.props.recordPrice((price+drink)*numOfCustomer);
      }
    }else{
      if(childPrice){
        this.props.recordPrice(price*numOfCustomer+(numOfChild*childPrice));
      }else{
        this.props.recordPrice(price*numOfCustomer);
      }
    }

  }

  componentWillMount(){
    const {refId} = this.props.restaurants;
    const {numOfCustomer} = this.props.bookingForm;
    const {sectionTime} = this.props.restaurants.restaurant;
    this.props.fetchingEstimatedTimeTable(refId, sectionTime[0]);
    this.props.checkNumOfCustomer(refId,sectionTime[0],numOfCustomer);
  }

  render() {
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
    fetchingEstimatedTimeTable: (id, timeText) => dispatch(fetchingEstimatedTimeTable(id, timeText)),
    recordPrice: (price) => dispatch(recordPrice(price)),
    checkNumOfCustomer: (resId, timeText, customer) => dispatch(checkNumOfCustomer(resId, timeText, customer)),
    validateDate: () => dispatch(validateDate()),
    validatePhone: () => dispatch(validatePhone()),
    validateName: () => dispatch(validateName()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail)
//export default RestaurantDetail;
