'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native';
import FirebaseService from '../../services/firebase-service';
import {SearchBar} from 'react-native-elements';
import Restaurant from '../sub-components/Restaurant';
import TestRedux from '../sub-components/TestRedux';
import {connect} from 'react-redux';
import {fetchRestaurantFromFirebase} from '../../actions/actions'
import {searchingRestaurant} from '../../actions/actions'

class RestaurantListView extends Component {
  componentWillMount(){
    this.props.getRestaurantList();
  }

  renderRow(restaurant, sectionId, rowId){
    return (
      <Restaurant data={restaurant} rowId={rowId} onPress={this.props.onPress}/>
    )
  }

  render() {
    const {restaurants,restaurantDataSource,isFetching,noData,keyword,noMatched} = this.props.restaurants;
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme = {true}
          onChangeText={(text)=> this.props.searchingRestaurant(restaurants,text)}
          value = {keyword}
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
            <Text style={styles.description}>
              Loading...
            </Text>
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
  }
});

function mapStateToProps (state) {
  return {
    restaurants: state.restaurants
  }
}

function mapDispatchToProps (dispatch) {
  return{
    getRestaurantList: () => dispatch(fetchRestaurantFromFirebase()),
    searchingRestaurant: (restaurants,text) => dispatch(searchingRestaurant(restaurants,text)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListView)
