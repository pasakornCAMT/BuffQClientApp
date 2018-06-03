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
import Booking from '../components/booking/booking';
import BookingConfirm from '../components/booking/booking-confirm';
import Search from '../components/search/search';
import MyBookingList from '../components/screens/MyBookingList'
import MyBookingDetail from '../components/my-booking/my-booking-detail';
import MyBookingUpdate from '../components/my-booking/my-booking-update';

const HomeStack = StackNavigator({
  Home: {screen: Home},
  Booking: {screen: Booking},
  BookingConfirm: {screen: BookingConfirm},
});

const MyBookingStack = StackNavigator({
  MyBookingList: {screen: MyBookingList},
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