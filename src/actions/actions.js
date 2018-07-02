import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  FETCHING_BOOKINGS,
  NO_RESTAURANT_DATA,
  SEARCHING_RESTAURANT_SUCCESS,
  NO_MATCHED_RESTAURANT,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  NAVIGATE_TO_BOOKING_DETAIL,
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_NUM_OF_CHILD,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
  RECORD_PRICE,
  CHECKED_DRINK,
  CLEAR_FORM_DATA,
  CAN_BOOK,
  CAN_NOT_BOOK,
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  GET_RESTAURANT_BY_ID,
  NO_MY_BOOKING_DATA,
  INITIAL_MY_BOOKING,
  EDIT_BOOKING_DATE,
  EDIT_BOOKING_TIME,
  EDIT_NUM_OF_CHILD,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  PREPARE_EDITED_VALUE,
  VALIDATE_DATE,
  VALIDATE_PHONE,
  VALIDATE_NAME,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchRestaurantFromFirebase(){
    return (dispatch) => {
      dispatch(getRestaurantList())
      try {
        FirebaseService.child('restaurants').on('value',(snap)=>{
          if(snap.val() === null){
            dispatch(noRestaurantData())
          }else{
            dispatch(getRestaurantListSuccess(snap.val()))
          }

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

export function fetchingBooking(){
  return (dispatch) => {
    try {
      FirebaseService.child('bookings').child('users').child('1').on('value',(snap)=>{
        dispatch(fetchingBookingSuccess(snap.val()))
      })
    } catch (e) {

    }
  }
}

export function fetchingBookingSuccess(bookings){
  return{
    type: FETCHING_BOOKINGS,
    bookings,
  }
}

export function noRestaurantData(){
  return{
    type: NO_RESTAURANT_DATA
  }
}
///////////////////////SEARCHING/////////////////////////////
export function searchingRestaurant (restaurants,text){
  return (dispatch) => {
    const newData = restaurants.filter(function(restaurant){
      const restaurantData = restaurant.name.toUpperCase()
      const textData = text.toUpperCase()
      return restaurantData.indexOf(textData) > -1
    })
    dispatch(displayRestaurantSuccess(newData,text))
    if(newData.length === 0 || newData === null){
      dispatch(displayRestaurantFailure(text))
    }

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
  return{
    type: NO_MATCHED_RESTAURANT,
    text,
  }
}
/////////////////////PREPARED-NAVIGATION/////////////////////////////
export function preparedRestaurantDetail(restaurant, refId){
  return{
    type: NAVIGATE_TO_RESTAURANT_DETAIL,
    restaurant,
    refId,
  }
}
export function preparedBookingDetail(booking, refId){
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

export function fillNumOfChild(numOfChild){
  return{
    type: FILL_NUM_OF_CHILD,
    numOfChild,
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

export function recordPrice(price){
  return{
    type: RECORD_PRICE,
    price,
  }
}

export function checkedDrink(){
  return{
    type: CHECKED_DRINK,
  }
}

export function clearFormData(){
  return{
    type: CLEAR_FORM_DATA
  }
}

export function validateDate(){
  return{
    type: VALIDATE_DATE
  }
}

export function validatePhone(){
  return{
    type: VALIDATE_PHONE
  }
}

export function validateName(){
  return{
    type: VALIDATE_NAME
  }
}

export function checkNumOfCustomer(resId, dateText, timeText, customer){
  return (dispatch) => {
    let maximum = 0;
    FirebaseService.child('restaurants').child(resId).on('value',(snap)=>{
      maximum = snap.val().maximumPerRound;
    });
    console.log('max: ',maximum);
    let numOfCustomer = 0;
    try {
      FirebaseService.child('bookings').child('users').child('1')
      .orderByChild('dateText_timeText').equalTo(dateText+'_'+timeText).on('value',(snap)=>{
        console.log('booking: ', snap.val());
        for(let booking in snap.val()){
          numOfCustomer = numOfCustomer + snap.val()[booking].numOfCustomer;
        }
        console.log('num:', numOfCustomer);
        if((maximum-numOfCustomer) < customer){
          console.log('cannot book');
          dispatch(cannotBook())
        }else{
          console.log('can book');
          dispatch(canBook())
        }
      });
    } catch (e) {
      console.log('can book excep');
      dispatch(canBook())
    }
  }
}

export function canBook(){
  return{
    type: CAN_BOOK
  }
}

export function cannotBook(){
  return{
    type: CAN_NOT_BOOK
  }
}
//////////////EstimatedTimeTable////////////////////

export function fetchingEstimatedTimeTable(id, timeText){
  return (dispatch) => {
    try {
      FirebaseService.child('EstimatedTime')
      .child(id).child(timeText).on('value',(snap)=>{
        dispatch(getTableSuccess(snap.val()))
      })
    } catch (e) {

    } finally {

    }
  }
}

export function clearTable(){
  return{
    type: CLEAR_TABLE,
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
        FirebaseService.child('bookings').child('users').child('1').on('value',(res)=>{
          let bookings = [];
          if(res.val() === null){
            dispatch(noMyBookingData())
          }else{
            dispatch(getMyBookingListSuccess(res.val()))
          }
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

export function getRestaurantById(refId){
  return (dispatch) => {
    FirebaseService.child('restaurants').child(refId).on('value',(snap)=>{
      dispatch(getRestaurantSuccess(snap.val()));
    })
  }
}

export function getRestaurantSuccess(restaurant){
  return{
    type: GET_RESTAURANT_BY_ID,
    restaurant,
  }
}

export function noMyBookingData(){
  return{
    type: NO_MY_BOOKING_DATA
  }
}

export function initialMyBooking(){
  return{
    type: INITIAL_MY_BOOKING
  }
}

export function editBookingDate(dateText){
  return{
    type: EDIT_BOOKING_DATE,
    dateText,
  }
}

export function editBookingTime(timeText){
  return{
    type: EDIT_BOOKING_TIME,
    timeText,
  }
}

export function editNumOfCustomer(numOfCustomer){
  return{
    type: EDIT_NUM_OF_CUSTOMER,
    numOfCustomer,
  }
}

export function editNumOfChild(numOfChild){
  return{
    type: EDIT_NUM_OF_CHILD,
    numOfChild,
  }
}

export function editPhoneNumber(phone){
  return{
    type: EDIT_PHONE_NUMBER,
    phone,
  }
}

export function editCustomerName(customer){
  return{
    type: EDIT_CUSTOMER_NAME,
    customer,
  }
}

export function prepareEditedValue(numOfCustomer, phone, customer){
  return{
    type: PREPARE_EDITED_VALUE,
    numOfCustomer,
    phone,
    customer,
  }
}
