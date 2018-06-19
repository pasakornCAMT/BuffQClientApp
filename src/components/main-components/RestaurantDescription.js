'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class RestaurantDescription extends Component {
  render() {
    const {restaurant} = this.props.restaurants;
    return (
      <View style={styles.container}>
        <Text style={styles.drink}>
          {restaurant.type}
        </Text>
        <Text style={styles.detail}>
          Open: {restaurant.openTime} - {restaurant.closeTime}
        </Text>
        <Text style={styles.detail}>
          {restaurant.openDate}
        </Text>
        <Text style={styles.detail}>
          Price: {restaurant.price} THB / person
        </Text>
        <Image
          style={styles.image}
          source={{uri: 'https://cmxpv89733.i.lithium.com/t5/image/serverpage/image-id/82937i163CEC7FAC876446/image-size/large?v=1.0&px=999'}}
        />
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
    fontSize: 20,
  },
  image:{
    width:'100%',
    height:200,
    marginTop: 10,
  },
  drink:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red'
  }
});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(RestaurantDescription)
//export default RestaurantDescription;
