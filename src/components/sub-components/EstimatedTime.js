'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class EstimatedTime extends Component {
  render() {
    const table = this.props.data;
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          {table.dateText}
        </Text>
        <Text style={styles.percentage}>
          {table.timeText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
  },
  time:{
    fontSize: 20,
  },
  percentage:{
    fontSize: 20,
  }
});


export default EstimatedTime;
