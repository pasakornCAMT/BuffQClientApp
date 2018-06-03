'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';

class Restaurant extends Component {
  render() {
    const restaurant = this.props.data;
    return (
      <TouchableHighlight onPress={()=>{
        this.props.onPress(restaurant);
      }}>
      <View style={styles.li}>
        <Text style={styles.liText}>
          {restaurant.title}
        </Text>
        <Image
          style={styles.image}
          source={{uri: restaurant.image}}
        />
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius:10,
  },

  image:{
    flexGrow: 1,
    width:'100%',
    height:200,
    alignItems: 'center',
    justifyContent:'center',
  },
  liText: {
    color: 'tomato',
    fontSize: 32,
  },

});


export default Restaurant;
