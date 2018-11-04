'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  ActivityIndicator,
} from 'react-native';

class EstimatedTimeTable extends Component {

  render() {
    const { tables, isFetching, notEnoughData } = this.props.estimatedTimeTable;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Estimated waiting time</Text>
        {
          isFetching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          ) : (
              <View>
                {
                  notEnoughData ? (
                    <View style={styles.warningContainer}>
                    <Text style={styles.warning}>Not Enough Data</Text>
                    </View>
                    
                  ) : (
                      <View style={{ flexDirection: 'row', height: 150 }}>
                        <YAxis
                          data={tables}
                          yAccessor={({ index }) => index}
                          scale={scale.scaleBand}
                          contentInset={{ top: 10, bottom: 10 }}
                          spacing={0.3}
                          formatLabel={(_, index) => tables[index].time}
                        />
                        <BarChart
                          style={{ flex: 1, marginLeft: 7, marginRight: 7 }}
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
                          style={{ paddingLeft: 2 }}
                          data={tables}
                          yAccessor={({ index }) => index}
                          scale={scale.scaleBand}
                          contentInset={{ top: 10, bottom: 10 }}
                          spacing={0.3}
                          formatLabel={(_, index) => tables[index].percentage + '% '}
                        />
                      </View>
                    )
                }
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    height: 150
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150
  },
  warning:{
    color: '#ccc'
  }
});

function mapStateToProps(state) {
  return {
    estimatedTimeTable: state.estimatedTimeTable,
    restaurants: state.restaurants,
  }
}

export default connect(mapStateToProps)(EstimatedTimeTable)
