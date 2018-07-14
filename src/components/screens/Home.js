'use strict';

import React, { Component } from 'react';
import RestaurantListView from '../main-components/RestaurantListView';
import { connect } from 'react-redux';
import { preparedRestaurantDetail, clearFormData, clearTable } from '../../actions/actions'
import {
  StyleSheet,
  View,
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  pressRow(restaurant, refId) {
    console.log('Restaurant: ', restaurant);
    console.log('ID: ', refId);
    this.props.preparedRestaurantDetail(restaurant, refId);
    this.props.clearFormData();
    this.props.clearTable();
    this.navigateToRestaurantDetail();
  }

  navigateToRestaurantDetail() {
    const { navigate } = this.props.navigation;
    navigate('RestaurantDetail');
  }

  render() {
    return (
      <View style={styles.container}>
        <RestaurantListView onPress={this.pressRow.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  }
});

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants,
    bookingForm: state.bookingForm,
    estimatedTimeTable: state.estimatedTimeTable,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    preparedRestaurantDetail: (restaurant, refId) => dispatch(preparedRestaurantDetail(restaurant, refId)),
    clearFormData: () => dispatch(clearFormData()),
    clearTable: () => dispatch(clearTable()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
//export default Home;
