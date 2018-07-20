import FirebaseService from '../services/firebase-service'
import {Alert} from 'react-native'

export function insertBookingToFirebase(bookingForm, restaurant) {
    const userId = '1';
    const bookingUserRef = FirebaseService.child('bookings').child('users').child('1');
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let pressDate = days[new Date().getDay()] + ' ' + date + '-' + month + '-' + year + ' ' + hours + ':' + min;
    const bookingData = {
        dateText: bookingForm.dateText,
        dateText_timeText: bookingForm.dateText + '_' + bookingForm.timeText,
        numOfCustomer: bookingForm.numOfCustomer,
        phone: bookingForm.phoneNumber,
        customer: bookingForm.customerName,
        timeText: bookingForm.timeText,
        pressDate: pressDate,
        restaurantId: restaurant.id,
        restaurant: restaurant.name,
        resImage: restaurant.image,
        totalPrice: bookingForm.price,
        userId: userId,
        status: 'booking',
    }
    if (restaurant.childPrice) {
        bookingData.numOfCustomer = bookingForm.numOfCustomer + bookingForm.numOfChild;
        bookingData.numOfChild = bookingForm.numOfChild;
        bookingData.numOfAdult = bookingForm.numOfCustomer;
    }
    if (restaurant.drink) {
        bookingData.includeDrink = bookingForm.drink;
    }
    try {
        bookingUserRef.push(bookingData)
        alertBookingResult(true)
        return true
    } catch (e) {
        alertBookingResult(false)
        return false
    }
}

export function alertBookingResult(result) {
    if (result) {
        Alert.alert('Booking success');
    } else {
        Alert.alert('Booking fail');
    }
}