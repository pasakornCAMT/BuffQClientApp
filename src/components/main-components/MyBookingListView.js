'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import MyBooking from '../sub-components/MyBooking';

import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

class MyBookingListView extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      bookingDataSource: this.ds,
    };
    this.bookingsRef = FirebaseService.child('bookings');
    this.renderRow = this.renderRow.bind(this);
    this.bookings = [];
  }

  componentWillMount(){
    this.getBookingList(this.bookingsRef);
  }

  componentDidMount(){
    //this.state.bookingDataSource = this.ds;
  }

  getBookingList(bookingsRef){
    bookingsRef.on('value',(snap)=>{
      //let items = [];
      snap.forEach((child)=>{
        //if(child.val().restaurant === "Eim-dee"){
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
        //}
      });
      this.setState({
        bookingDataSource: this.state.bookingDataSource.cloneWithRows(this.bookings)
      });
    });
  }

  renderRow(booking){
    return (
      <MyBooking data={booking} onPress={this.props.onPress}/>
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


export default MyBookingListView;
