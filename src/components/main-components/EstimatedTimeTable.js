'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import EstimatedTime from '../sub-components/EstimatedTime';
import {connect} from 'react-redux';
import { BarChart, Grid, YAxis} from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import {
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native';

class EstimatedTimeTable extends Component {

  render() {
    const {tables} = this.props.estimatedTimeTable;
    return (
      <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: 150 }}>
      <YAxis
        data={tables}
        yAccessor={({ index }) => index}
        scale={scale.scaleBand}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.3}
        formatLabel={(_, index) => tables[ index ].time}
      />
      <BarChart
          style={{ flex: 1, marginLeft: 7, marginRight: 7}}
          data={tables}
          horizontal={true}
          yAccessor={({ item }) => item.percentage}
          svg={{ fill: 'tomato' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.3}
          gridMin={0}
      >
      </BarChart>
      <YAxis
        style={{paddingLeft: 2}}
        data={tables}
        yAccessor={({ index }) => index}
        scale={scale.scaleBand}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.3}
        formatLabel={(_, index) => tables[ index ].percentage+'% '}
      />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    margin: 5,
    borderRadius:10,
    padding: 5,
  },
});

function mapStateToProps (state) {
  return {
    estimatedTimeTable: state.estimatedTimeTable,
    restaurants: state.restaurants,
  }
}


export default connect(mapStateToProps)(EstimatedTimeTable)
//export default EstimatedTimeTable;
