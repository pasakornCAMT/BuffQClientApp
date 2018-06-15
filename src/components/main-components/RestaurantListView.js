'use strict';

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ListView,
  Image,
  Button,
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

  renderRow(restaurant){
    return (
      <Restaurant data={restaurant} onPress={this.props.onPress}/>
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
  button: {
    backgroundColor: '#33ff99',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },

  listview: {
    flex: 1,
  },

  li: {
    backgroundColor: '#fff',
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius:10,
  },

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
