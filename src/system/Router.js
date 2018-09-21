import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import Home from '../components/screens/Home';
import BookingConfirm from '../components/screens/BookingConfirm';
import MyBookingList from '../components/screens/MyBookingList'
import MyBookingDetail from '../components/screens/MyBookingDetail';
import MyBookingEdit from '../components/screens/MyBookingEdit';
import RestaurantDetail from '../components/screens/RestaurantDetail';
import Maps from '../components/screens/Maps';

const HomeStack = StackNavigator({
  Home: {screen: Home},
  RestaurantDetail: {screen: RestaurantDetail},
  BookingConfirm: {screen: BookingConfirm},
});

const MyBookingStack = StackNavigator({
  MyBookingList: {screen: MyBookingList},
  MyBookingDetail: {screen: MyBookingDetail},
  MyBookingEdit: {screen: MyBookingEdit},
})

const MapsStack = StackNavigator({
  Maps: {screen: Maps},
})

export default TabNavigator(
  {
    Home: {screen: HomeStack},
    Maps: {screen: MapsStack},
    MyBooking: {screen: MyBookingStack},
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if(routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        }else if(routeName === 'Maps'){
          iconName = `ios-map${focused ? '' : '-outline'}`;
        }else if (routeName === 'MyBooking') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor}/>
      },
    }),
    tabBarOptions:{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
)
