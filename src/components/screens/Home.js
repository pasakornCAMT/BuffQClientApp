'use strict';

import React, { Component } from 'react';
import RestaurantListView from '../main-components/RestaurantListView';
import {connect} from 'react-redux';
import {navigateToRestaurantDetail, clearFormData} from '../../actions/actions'
import {
  StyleSheet,
  View,
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  pressRow(restaurant, refId){
    console.log('passRes: ',restaurant);
    console.log('ID:', refId);
    this.props.navigateToRestaurantDetail(restaurant, refId);
    this.props.clearFormData();
    const {navigate} = this.props.navigation;
    navigate('RestaurantDetail');
  }

  render() {
    return (
      <RestaurantListView onPress={this.pressRow.bind(this)}/>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants,
    bookingForm: state.bookingForm,
  }
}

function mapDispatchToProps (dispatch) {
  return{
    navigateToRestaurantDetail: (restaurant, refId) => dispatch(navigateToRestaurantDetail(restaurant, refId)),
    clearFormData: () => dispatch(clearFormData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
//export default Home;
