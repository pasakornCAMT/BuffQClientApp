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
      <View style={styles.container}>
      {tables.map((table,key)=>(
        <View key={key}>
          <Text style={styles.detail}>
            {table.time}: {table.percentage} %
          </Text>
        </View>
      ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flex:1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius:10,
    padding: 7,
  },
  detail:{
    fontSize: 16,
  }
});

function mapStateToProps (state) {
  return {
    estimatedTimeTable: state.estimatedTimeTable,
  }
}


export default connect(mapStateToProps)(EstimatedTimeTable)
//export default EstimatedTimeTable;
