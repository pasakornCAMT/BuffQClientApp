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
    this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      text: '',
      bookingDataSource: this.ds,
    };
    this.bookingsRef = FirebaseService.child('bookings');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
    this.bookings = [];
  }

  componentWillMount(){
    this.getItems(this.bookingsRef);
  }

  componentDidMount(){
    this.state.bookingDataSource = this.ds;
  }

  getItems(bookingsRef){
    bookingsRef.on('value',(snap)=>{
      //let items = [];
      snap.forEach((child)=>{
        this.bookings.push({
          resName: child.val().restaurant,
          resImage: child.val().resImage,
          numOfCustomer: child.val().numOfCustomer,
          dateText: child.val().dateText,
          timeText: child.val().timeText,
          customer: child.val().customer,
          phone: child.val().phone,
          bookingKey: child.key
        });
      });
      this.setState({
        bookingDataSource: this.state.bookingDataSource.cloneWithRows(this.bookings)
      });
    });
  }

  pressRow(booking){
    const {navigate} = this.props.navigation;
    console.log(booking);
    //this.itemsRef.child(item._key).remove();
    navigate('MyBookingDetail',{
      booking: booking,
    });
  }

  renderRow(booking){
    return (
      <TouchableHighlight onPress={()=>{
        this.pressRow(booking);
      }}>
      <View style={styles.li}>
        <Image
          style={styles.image}
          source={{uri: booking.resImage}}
          />
        <View style={styles.liRight}>
          <Text style={styles.liText}>
            {booking.resName}
          </Text>
          <Text style={styles.liText}>
            {booking.dateText}
          </Text>
          <Text style={styles.liText}>
            {booking.timeText}
          </Text>
          <Text style={styles.liText}>
            {booking.numOfCustomer} people
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
          dataSource = {this.state.bookingDataSource}
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
