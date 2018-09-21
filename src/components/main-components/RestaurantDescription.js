'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class RestaurantDescription extends Component {
  render() {
    const { restaurant } = this.props.restaurants;
    return (
      <View style={styles.container}>
        {
          restaurant.drink ? (
            <View>
              <Text style={styles.normalDrink}>
                Including a drink {restaurant.price + restaurant.drink} THB
            </Text>
              <Text style={styles.normalDrink}>
                Not including {restaurant.price} THB
            </Text>
            </View>
          ) : null
        }
        <Text style={styles.drink}>
          {restaurant.type}
        </Text>
        <Text style={styles.detail}>
          Open: {restaurant.openTime} - {restaurant.closeTime}, {restaurant.openDate}
        </Text>
        {
          restaurant.childPrice ? (
            <View>
              <Text style={styles.detail}>
                Adult: {restaurant.price} THB/person
            </Text>
              <Text style={styles.detail}>
                Child: {restaurant.childPrice} THB/person
            </Text>
            </View>
          ) : (
              <Text style={styles.detail}>
                Price: {restaurant.price} THB/person
            </Text>
            )
        }
        <View style={styles.mapContainer}>
          <MapView
            loadingEnabled={true}
            minZoomLevel={12}
            style={styles.map}
            initialRegion={{
              latitude: restaurant.latitude,
              longitude: restaurant.longtitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
              <Marker
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longtitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title={restaurant.name}
                pinColor='tomato'
              />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 7,
    paddingBottom: 100,
  },
  detail: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  drink: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red'
  },
  normalDrink: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(RestaurantDescription)
//export default RestaurantDescription;
