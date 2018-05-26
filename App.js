/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import Home from './src/components/home/home';
import Booking from './src/components/booking/booking';
import BookingConfirm from './src/components/booking/booking-confirm';
import Search from './src/components/search/search';
import MyBooking from './src/components/my-booking/my-booking';
import MyBookingDetail from './src/components/my-booking/my-booking-detail';
import MyBookingUpdate from './src/components/my-booking/my-booking-update';

const HomeStack = StackNavigator({
  Home: {screen: Home},
  Booking: {screen: Booking},
  BookingConfirm: {screen: BookingConfirm},
});

const MyBookingStack = StackNavigator({
  MyBooking: {screen: MyBooking},
  MyBookingDetail: {screen: MyBookingDetail},
  MyBookingUpdate: {screen: MyBookingUpdate},
})

export default TabNavigator(
  {
    Home: {screen: HomeStack},
    MyBooking: {screen: MyBookingStack},
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if(routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'MyBooking') {
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
    animationEnabled: false,
    swipeEnabled: false,
  }
)
