import {
    FETCHING_RESTAURANT_LIST,
    FETCHING_RESTAURANT_LIST_SUCCESS,
    FETCHING_RESTAURANT_LIST_FAILURE,
    FETCHING_BOOKINGS,
    NO_RESTAURANT_DATA,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchRestaurantFromFirebase() {
    return (dispatch) => {
        dispatch(getRestaurantList())
        try {
            FirebaseService.database().ref().child('restaurants').on('value', (snap) => {
                if (snap.val() === null) {
                    dispatch(noRestaurantData())
                } else {
                    dispatch(getRestaurantListSuccess(snap.val()))
                }
            })
        } catch (e) {
            dispatch(getRestaurantListFailure())
        }
    }
}

export function getRestaurantList() {
    return {
        type: FETCHING_RESTAURANT_LIST
    }
}

export function getRestaurantListSuccess(restaurants) {
    return {
        type: FETCHING_RESTAURANT_LIST_SUCCESS,
        restaurants,
    }
}

export function getRestaurantListFailure() {
    return {
        type: FETCHING_RESTAURANT_LIST_FAILURE
    }
}

export function fetchingBooking() {
    return (dispatch) => {
        try {
            FirebaseService.database().ref().child('bookings').child('online').on('value', (snap) => {
                dispatch(fetchingBookingSuccess(snap.val()))
            })
        } catch (e) {

        }
    }
}

export function fetchingBookingSuccess(bookings) {
    return {
        type: FETCHING_BOOKINGS,
        bookings,
    }
}

export function noRestaurantData() {
    return {
        type: NO_RESTAURANT_DATA
    }
}