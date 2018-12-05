import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert,
    TouchableHighlight,
    Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { preparedRestaurantDetail } from '../../actions/navigate-action';

class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            isPressMarker: false
        })
    }
    static navigationOptions = {
        title: 'Maps',
    };
    getPinColor(price) {
        let color = '';
        if (price >= 180) {
            color = 'red'
        } else if (price >= 130) {
            color = 'orange'
        } else {
            color = 'green'
        }
        return color
    }
    onPressMarker(restaurant) {
        this.props.preparedRestaurantDetail(restaurant, restaurant.id);
        this.setState({isPressMarker: true});
    }
    navigateToRestaurantDetail() {
        const { navigate } = this.props.navigation;
        navigate('RestaurantDetail');
    }
    render() {
        const { restaurants } = this.props.restaurants;
        const { restaurant} = this.props.restaurants;
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
                    {
                        //restaurants.map((restaurant, key) => (
                        Object.values(restaurants).map((restaurant, key) => (
                            <Marker key={key}
                                coordinate={{
                                    latitude: restaurant.latitude,
                                    longitude: restaurant.longtitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={restaurant.name}
                                description={'' + restaurant.price}
                            onPress={()=>this.onPressMarker(restaurant)}
                            />
                        ))
                    }
                </MapView>
                {/* <View style={{ backgroundColor: 'white', padding: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', color: 'red' }}>Red:</Text><Text> more than 20 bookings</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', color: '#fd9644' }}>Orange:</Text><Text> 10-20 bookings</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', color: '#26de81' }}>Green:</Text><Text> less than 10 bookings</Text>
                    </View>
                </View> */}
                {
                    this.state.isPressMarker ? (
                        <View style={{ backgroundColor: 'white' }}>
                        <TouchableHighlight onPress={() => {
                            //this.props.onPress(booking, refId, booking.restaurantId);
                            this.navigateToRestaurantDetail()
                        }}>
                            <View style={styles.li}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: restaurant.image }}
                                />
                                <View style={styles.liRight}>
                                    <Text style={styles.liText}>
                                        {restaurant.name}
                                    </Text>
                                    <Text style={styles.liText}>
                                        {restaurant.price} THB
                                    </Text>
                                    <Text style={styles.liText}>
                                        {restaurant.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    ) : null
                }
               
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
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: '100%',
        paddingVertical: 5,
    },
    liText: {
        color: '#333',
        fontSize: 12,
        marginLeft: 6,
    },
    liRight: {
        flexDirection: 'column',
    },
    spaceBetween: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pressDateText: {
        fontSize: 10,
        marginLeft: 6,
    }
});

function mapStateToProps(state) {
    return {
        restaurants: state.restaurants,
    }
}

function mapDispatchToProps (dispatch){
    return{
        preparedRestaurantDetail: (restaurant, refId) => dispatch(preparedRestaurantDetail(restaurant, refId)),
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Maps)
