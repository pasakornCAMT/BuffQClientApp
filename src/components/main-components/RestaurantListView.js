'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Restaurant from '../sub-components/Restaurant';
import {connect} from 'react-redux';
import {fetchRestaurantFromFirebase, fetchingBooking} from '../../actions/restaurant-action'
import {searchingRestaurant} from '../../actions/search-action'
import {initUserData, getMyQueue} from '../../actions/firebase-action'

class RestaurantListView extends Component {
  componentWillMount(){
    this.props.getRestaurantList();
    this.props.fetchingBooking();
    //initUserData();
    //console.log(getMyQueue('-LPW1jp7JEOgSBOn3EaJ', '23-10-2018','5WmrSonECnNqBLIUQzlgA7i4T0I3'))
  }

  renderRow(restaurant, sectionId, rowId){
    const numOfQueue = this.countNumOfQueue(restaurant.id);
    return (
      <Restaurant data={restaurant} numOfQueue={numOfQueue} rowId={restaurant.id} onPress={this.props.onPress}/>
    )
  }

  countNumOfQueue(rowId){
    const {bookings} = this.props.restaurants;
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let fullDate = date+'-'+month+'-'+year;
    let numOfQueue = 0;
    for(let i in bookings){
      if(bookings[i].restaurantId === rowId && bookings[i].dateText === fullDate){
         numOfQueue = numOfQueue+1
      }
    }
    return numOfQueue;
  }

  render() {
    const {restaurants,restaurantDataSource,isFetching,noData,keyword,noMatched} = this.props.restaurants;
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme = {true}
          onChangeText={(text)=> this.props.searchingRestaurant(restaurants,text)}
          value = {keyword}
          placeholder = 'Search...'
        />
        {
          keyword.length > 20 ? (
            <Text style={styles.keywordMessage}>
              Please input less than 20 characters in the keyword
            </Text>
          ) : null
        }
        {
          noMatched && keyword.length > 0 ? (
            <Text style={styles.description}>
              No matched with the keyword
            </Text>
          ): null
        }
        {
          isFetching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          ): null
        }
        {
          noData ? (
            <Text style={styles.description}>
              There is no data in the database.
            </Text>
          ): null
        }
        <ListView
          dataSource = {restaurantDataSource}
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
  keywordMessage:{
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
  },
  container:{
    paddingBottom: 110,
  },
  loadingContainer:{
    justifyContent: 'center',
    marginTop: 20,
  }
});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants,
  }
}

function mapDispatchToProps (dispatch) {
  return{
    getRestaurantList: () => dispatch(fetchRestaurantFromFirebase()),
    searchingRestaurant: (restaurants,text) => dispatch(searchingRestaurant(restaurants,text)),
    fetchingBooking: () => dispatch(fetchingBooking()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListView)
