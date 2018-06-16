'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
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
    const {restaurants,restaurantDataSource} = this.props.restaurants;
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme = {true}
          onChangeText={(text)=> this.props.searchingRestaurant(restaurants,text)}
          value = {this.props.restaurants.keyword}
        />
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
