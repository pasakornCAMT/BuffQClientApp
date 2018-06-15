'use strict';

import React, { Component } from 'react';
import RestaurantListView from '../main-components/RestaurantListView';
import {connect} from 'react-redux';
import {navigateToRestaurantDetail} from '../../actions/actions'
import {
  StyleSheet,
  View,
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  pressRow(restaurant){
    console.log('passRes: ',restaurant);
    this.props.navigateToRestaurantDetail(restaurant);
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
    restaurants: state.restaurants
  }
}

function mapDispatchToProps (dispatch) {
  return{
    navigateToRestaurantDetail: (restaurant) => dispatch(navigateToRestaurantDetail(restaurant)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
//export default Home;
