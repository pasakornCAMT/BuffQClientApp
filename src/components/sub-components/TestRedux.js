'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {fetchRestaurantFromFirebase} from '../../actions/actions'

class TestRedux extends Component {
  componentWillMount(){
    this.props.getRestaurantList();
  }
  render() {
    const { restaurants, isFetching} = this.props.restaurants;
    return (
      <View>
      {restaurants.map((res,key)=>(
        <View key={key}>
          <Text>
            {res.title}
          </Text>
        </View>
      ))}
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

function mapDispatchToProps (dispatch) {
  return{
    getRestaurantList: () => dispatch(fetchRestaurantFromFirebase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux)
