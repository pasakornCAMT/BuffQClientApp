'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';

import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

class MyBooking extends Component {
  static navigationOptions = {
    title: 'MyBooking',
  };
  constructor() {
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      text: '',
      itemDataSource: ds,
    };

    this.itemsRef = FirebaseService.child('bookings');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
    this.items = [];
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap)=>{
      //let items = [];
      snap.forEach((child)=>{
        this.items.push({
          resName: child.val().restaurant,
          resImage: child.val().resImage,
          numOfCustomer: child.val().numOfCustomer,
          dateText: child.val().dateText,
          customer: child.val().customer,
          bookingKey: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(this.items)
      });
    });
  }

  pressRow(item){
    const {navigate} = this.props.navigation;
    console.log(item);
    //this.itemsRef.child(item._key).remove();
    navigate('MyBookingDetail',{
      item: item,
    });
  }

  renderRow(item){
    return (
      <TouchableHighlight onPress={()=>{
        this.pressRow(item);
      }}>
      <View style={styles.li}>
        <Image
          style={styles.image}
          source={{uri: item.resImage}}
          />
        <View style={styles.liRight}>
          <Text style={styles.liText}>
            {item.resName}
          </Text>
          <Text style={styles.liText}>
            {item.dateText}
          </Text>
          <Text style={styles.liText}>
            {item.numOfCustomer} people
          </Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource = {this.state.itemDataSource}
          renderRow = {this.renderRow}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listview: {
    flex: 1,
  },

  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },

  image:{
    width:150,
    height:100,
  },

  liContainer: {
    flex: 2,
  },

  liText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 6,
  },

  liRight: {
    flexDirection: 'column',
  }
});


export default MyBooking;
