'use strict';

import React, { Component } from 'react';
import FirebaseService from '../../services/firebase-service';
import MyBooking from '../sub-components/MyBooking';
import {connect} from 'react-redux';
import {fetchMyBookingFromFirebase} from '../../actions/actions'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

class MyBookingListView extends Component {

  componentWillMount(){
    this.props.fetchMyBookingFromFirebase();
  }

  renderRow(booking, sectionId, rowId){
    return (
      <MyBooking data={booking} rowId={rowId} onPress={this.props.onPress}/>
    )
  }

  render() {
    const {myBookingList, myBookingDataSource,noData, isFetching} = this.props.MyBookingReducer;
    return (
      <View>
        {
          isFetching ? (
            <Text style={styles.description}>
              Loading...
            </Text>
          ): null
        }
        {
          noData ? (
            <Text>
              There are no booking in your list
            </Text>
          ): null
        }
        <ListView
          dataSource = {myBookingDataSource}
          renderRow = {this.renderRow.bind(this)}
          enableEmptySections = {true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description:{
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

function mapStateToProps (state) {
  return {
    MyBookingReducer: state.MyBookingReducer
  }
}

function mapDispatchToProps (dispatch) {
  return{
    fetchMyBookingFromFirebase: () => dispatch(fetchMyBookingFromFirebase())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyBookingListView)
//export default MyBookingListView;
