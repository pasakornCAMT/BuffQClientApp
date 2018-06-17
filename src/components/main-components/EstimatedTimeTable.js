'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import EstimatedTime from '../sub-components/EstimatedTime';
import {connect} from 'react-redux';
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
      <View style={styles.spaceBetween}>
      <View style={styles.container}>
      {tables.map((table,key)=>(
        <View key={key}>
          <Text style={styles.detail}>
            {table.time}: {table.percentage} %
          </Text>
        </View>
      ))}
      </View>
      <Text style={styles.queueText}>
        Queue: {this.props.restaurants.restaurant.numOfQueue}
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
