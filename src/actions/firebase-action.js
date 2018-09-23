import FirebaseService from '../services/firebase-service'
import { Alert } from 'react-native'
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../constants/constants'
//export var userUid = '';

export function insertBookingToFirebase(bookingForm, restaurant) {
    //const userId = '0';
    const userId = FirebaseService.auth().currentUser.uid;
    //const bookingUserRef = FirebaseService.database().ref().child('bookings').child('users').child('1');
    const bookingUserRef = FirebaseService.database().ref().child('bookings').child('online');
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
        payment: false,
        type: 'online'
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
        var data = bookingUserRef.push(bookingData)
        var key = data.getKey()
        bookingUserRef.child(key).update({
            id: key
        })
        FirebaseService.database().ref().child('restaurantBookings').child(restaurant.id).child(key).set(true)
        FirebaseService.database().ref().child('userBookings').child(userId).child(key).set(true)
        // var data = FirebaseService.database().ref().child('products').push(product);
        // var key = data.getKey();
        // FirebaseService.database().ref().child('products').child(key).update({
        //     id: key
        // })
        alertBookingResult(true)
        return true
    } catch (e) {
        alertBookingResult(false)
        console.log(e)
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

export function register(userData) {
    console.log(userData)
    try {
        if (userData.password.length < 6) {
            alert("Please enter at least 6 characters")
        }
        FirebaseService.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
            FirebaseService.auth().onAuthStateChanged(function (user) {
                console.log('uid: ', user.uid);
                insertUserToFirebase(user.uid, userData);
            });
        }).catch((error) => {
            const { code, message } = error;
            console.log('code: ', code)
            console.log('message: ', message)
        });
    } catch (error) {
        console.log(error)
    }
}

export function insertUserToFirebase(id, data) {
    const user = {
        id: id,
        name: data.name,
        phone: data.phone,
        email: data.email
    }
    FirebaseService.database().ref().child('users').child(id).set(user);
}

export function login(email, password) {
    try {
        FirebaseService.auth().signInWithEmailAndPassword(email, password).then(() => {
            FirebaseService.auth().onAuthStateChanged(function (user) {
                console.log('user: ', user);
            });
        }).catch((error) => {
            const { code, message } = error;
            console.log('code: ', code)
            console.log('message: ', message)
        })
    } catch (error) {
        console.log(error)
    }
}

export function logout() {
    FirebaseService.auth().signOut();
}

export function getUserById(id) {
    // return (dispatch) => {
    //     dispatch(fetchUser());
    //         FirebaseService.database().ref().child('users').child(id).on('value',(snap)=>{
    //                 dispatch(getUserSuccess(snap.val()));
    //                 console.log(snap.val());
    //         })
    // }
    // fetchUser();
    // FirebaseService.database().ref().child('users').child(id).on('value', (snap) => {
    //     console.log(snap.val());
    //     getUserSuccess(snap.val());
    // })

}

export function initUserData() {
    return (dispatch) => {
        dispatch(fetchUser());
        try {
            const user = FirebaseService.auth().currentUser;
            console.log('userId: ', user.uid);
            FirebaseService.database().ref().child('users').child(user.uid).on('value', (snap) => {
                dispatch(getUserSuccess(snap.val()));
                console.log(snap.val());
            })
        } catch (error) {
            dispatch(getUserFail())
            console.log(error);
        }
    }
}

export function fetchUser() {
    return {
        type: LOGIN_USER
    }
}

export function getUserSuccess(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        user
    }
}

export function getUserFail() {
    return {
        type: LOGIN_USER_FAILURE
    }
}

