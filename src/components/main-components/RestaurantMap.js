import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

class RestaurantMap extends Component {
    render() {
        const { restaurant } = this.props.restaurants;
        return (
            <View style={styles.container}>
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
        height: 250
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

export default connect(mapStateToProps)(RestaurantMap);
