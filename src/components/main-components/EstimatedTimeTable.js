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
    const data = [
            {
                value: 50,
                label: '>20min',
            },
            {
                value: 15,
                label: '20-30min',
            },
            {
                value: 10,
                label: '30-40min',
            },
            {
                value: 10,
                label: '40-50min',
            },
            {
                value: 10,
                label: '50-60min',
            },
            {
                value: 5,
                label: '>60min',
            },
        ]
    return (
      <View style={styles.spaceBetween}>
      <View style={styles.container}>
      {tables.map((table,key)=>(
        <View key={key}>
          <Text style={styles.detail}>
            {table.time}: {table.percentage} %
          </Text>
        </View>
      ))}
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
      <YAxis
        data={data}
        yAccessor={({ index }) => index}
        scale={scale.scaleBand}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.2}
        formatLabel={(_, index) => data[ index ].label}
      />
      <BarChart
          style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.value}
          svg={{ fill: 'tomato' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
          animate={true}
          animationDuration={300}
      >
          <Grid direction={Grid.Direction.VERTICAL}/>
      </BarChart>
      <YAxis
        data={data}
        yAccessor={({ index }) => index}
        scale={scale.scaleBand}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.2}
        formatLabel={(_, index) => data[ index ].value+'% '}
      />

      </View>
      </View>
      </View>
    )
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
  },
  spaceBetween:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queueText:{
    marginRight: 30,
    marginLeft: 40,
    fontSize: 22,
    color: 'tomato'
  }
});

function mapStateToProps (state) {
  return {
    estimatedTimeTable: state.estimatedTimeTable,
    restaurants: state.restaurants,
  }
}


export default connect(mapStateToProps)(EstimatedTimeTable)
//export default EstimatedTimeTable;
