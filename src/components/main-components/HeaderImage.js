'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class HeaderImage extends Component {
  render() {
    const {restaurant} = this.props;
    return (
      <View>
        <Image
          style={styles.image}
          source={{uri: restaurant.image}}
        />
        <Text style={styles.titleText}>
          {restaurant.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    flexGrow: 1,
    width:'100%',
    height:100,
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{
    fontSize: 32,
    color: 'white',
    marginTop: 60,
  },
});


export default HeaderImage;
