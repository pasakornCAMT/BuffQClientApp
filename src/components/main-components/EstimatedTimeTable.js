'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import EstimatedTime from '../sub-components/EstimatedTime';

import {
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native';

class EstimatedTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.tables = [];
  }

  componentWillMount(){
    this.getTableData(this.props.estimatedTimeRef)
  }

  getTableData(estimatedTimeRef){
    estimatedTimeRef.on('value',(snap)=>{
      snap.forEach((child)=>{
          this.tables.push({
            time: child.val().time,
            percentage: child.val().percentage,
            _key: child.key
          });
      });
    });
  }

  render() {
    return (
      <View>
      {this.tables.map((table,key)=>(
        <View style={styles.container} key={table._key}>
          <Text>
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
  },
});


export default EstimatedTimeTable;
