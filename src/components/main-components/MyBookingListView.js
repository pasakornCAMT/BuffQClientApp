'use strict';

import React, { Component } from 'react';
import MyBooking from '../sub-components/MyBooking';
import { connect } from 'react-redux';
import { fetchMyBookingFromFirebase } from '../../actions/my-booking-action'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  ActivityIndicator,
} from 'react-native';
import FirebaseService from '../../services/firebase-service';

class MyBookingListView extends Component {

  componentWillMount() {
    const user = FirebaseService.auth().currentUser;
    this.props.fetchMyBookingFromFirebase(user.uid);
  }

  renderRow(booking, sectionId, rowId) {
    return (
      <MyBooking data={booking} rowId={rowId} onPress={this.props.onPress} />
    )
  }

  render() {
    const { myBookingList, myBookingDataSource, noData, isFetching, isError } = this.props.MyBookingReducer;
    return (
      <View>
        {
          isFetching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          ) : (
              noData ? (
                <Text style={styles.description}>
                  There are no booking in your list
              </Text>
              ) : (
                  isError ? (
                    <Text style={styles.description}>
                      There are Error
                </Text>
                  ) : (
                      <ListView
                        dataSource={myBookingDataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}
                      />
                    )
                )
            )
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    marginTop: 20,
  }
});

function mapStateToProps(state) {
  return {
    MyBookingReducer: state.MyBookingReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMyBookingFromFirebase: (uid) => dispatch(fetchMyBookingFromFirebase(uid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyBookingListView)

