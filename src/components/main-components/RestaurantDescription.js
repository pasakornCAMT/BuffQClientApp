'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class RestaurantDescription extends Component {
  render() {
    const {restaurant} = this.props.restaurants;
    return (
      <View style={styles.container}>
        <Text style={styles.detail}>
          Open: {restaurant.openTime}
        </Text>
        <Text style={styles.detail}>
          Close: {restaurant.closeTime}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flex:1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius:10,
    padding: 7,
  },
  detail:{
    fontSize: 16,
  }
});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(RestaurantDescription)
//export default RestaurantDescription;
