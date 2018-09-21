import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class Maps extends Component {
    static navigationOptions = {
        title: 'Maps',
    };
    getPinColor(price){
        let color = '';
        if(price >= 180){
            color = 'red'
        }else if(price >= 130){
            color = 'orange'
        }else{
            color = 'green'
        }
        return color
    }
    render() {
        const { restaurants } = this.props.restaurants;
        return (
            <View style={styles.mapContainer}>
                <MapView
                    loadingEnabled={true}
                    minZoomLevel={12}
                    style={styles.map}
                    initialRegion={{
                        latitude: 18.788322,
                        longitude: 98.985802,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {restaurants.map((restaurant,key) => (
                        <Marker key={key}
                            coordinate={{
                                latitude: restaurant.latitude,
                                longitude: restaurant.longtitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            title={restaurant.name}
                            description={''+restaurant.price}
                            pinColor={this.getPinColor(restaurant.price)}
                        />
                    ))}
                </MapView>
                <View style={{backgroundColor:'white', padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color:'red'}}>Red:</Text><Text> more than 20 bookings</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color:'#fd9644'}}>Orange:</Text><Text> 10-20 bookings</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color:'#26de81'}}>Green:</Text><Text> less than 10 bookings</Text>
                    </View>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        restaurants: state.restaurants,
    }
}

export default connect(mapStateToProps)(Maps)
