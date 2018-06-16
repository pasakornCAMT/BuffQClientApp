import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  SEARCHING_RESTAURANT_SUCCESS,
  SEARCHING_RESTAURANT_FAILURE,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  NAVIGATE_TO_BOOKING_DETAIL,
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchRestaurantFromFirebase(){
    return (dispatch) => {
      dispatch(getRestaurantList())
      try {
        FirebaseService.child('items').on('value',(snap)=>{
          dispatch(getRestaurantListSuccess(snap.val()))
        })
      } catch (e) {
        dispatch(getRestaurantListFailure())
      }
    }
}

export function getRestaurantList(){
  return{
    type: FETCHING_RESTAURANT_LIST
  }
}

export function getRestaurantListSuccess(restaurants){
  return{
    type: FETCHING_RESTAURANT_LIST_SUCCESS,
    restaurants,
  }
}

export function getRestaurantListFailure(){
  return{
    type: FETCHING_RESTAURANT_LIST_FAILURE
  }
}
///////////////////////SEARCHING/////////////////////////////
export function searchingRestaurant (restaurants,text){
  return (dispatch) => {
    const newData = restaurants.filter(function(restaurant){
      const restaurantData = restaurant.title.toUpperCase()
      const textData = text.toUpperCase()
      return restaurantData.indexOf(textData) > -1
    })
      dispatch(displayRestaurantSuccess(newData,text))
  }
}

export function displayRestaurantSuccess(newData,text){
  return{
    type: SEARCHING_RESTAURANT_SUCCESS,
    newData,
    text,
  }
}

export function displayRestaurantFailure(text){
  return (dispatch) => {
    dispatch(setRestaurantState(restaurant))
  }
}
/////////////////////NAVIGATION/////////////////////////////
export function navigateToRestaurantDetail(restaurant, refId){
  return{
    type: NAVIGATE_TO_RESTAURANT_DETAIL,
    restaurant,
    refId,
  }
}
export function navigateToBookingDetail(booking, refId){
  return{
    type: NAVIGATE_TO_BOOKING_DETAIL,
    booking,
    refId,
  }
}
////////////////////BOOKING FORM/////////////////////////////
export function fillDate(dateText){
  return{
    type: FILL_DATE,
    dateText,
  }
}

export function fillTime(selectedIndex, timeText){
  return{
    type: FILL_TIME,
    selectedIndex,
    timeText,
  }
}

export function fillNumOfCustomer(numOfCustomer){
  return{
    type: FILL_NUM_OF_CUSTOMER,
    numOfCustomer,
  }
}

export function fillPhoneNumber(phoneNumber){
  return{
    type: FILL_PHONE_NUMBER,
    phoneNumber,
  }
}

export function fillCustomerName(customerName){
  return{
    type: FILL_CUSTOMER_NAME,
    customerName,
  }
}
//////////////EstimatedTimeTable////////////////////

export function fetchingEstimatedTimeTable(id, timeText){
  return (dispatch) => {
    try {
      FirebaseService.child('items')
      .child(id).child('EstimatedTime').child(timeText).on('value',(snap)=>{
        dispatch(getTableSuccess(snap.val()))
      })
    } catch (e) {

    } finally {

    }
  }
}

export function getTableSuccess(table){
  return{
    type: FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
    table,
  }
}

/////////////////////MyBooking/////////////////////////////
export function fetchMyBookingFromFirebase(){
    return (dispatch) => {
      dispatch(getMyBookingList())
      try {
        FirebaseService.child('bookings').on('value',(snap)=>{
          dispatch(getMyBookingListSuccess(snap.val()))
        })
      } catch (e) {
        dispatch(getMyBookingListFailure())
      }
    }
}

export function getMyBookingList(){
  return{
    type: FETCHING_MY_BOOKING_LIST
  }
}

export function getMyBookingListSuccess(myBookingList){
  return{
    type: FETCHING_MY_BOOKING_LIST_SUCCESS,
    myBookingList,
  }
}

export function getMyBookingListFailure(){
  return{
    type: FETCHING_MY_BOOKING_LIST_FAILURE
  }
}
