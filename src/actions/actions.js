import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  SEARCHING_RESTAURANT_SUCCESS,
  SEARCHING_RESTAURANT_FAILURE,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchRestaurantFromFirebase(){
    return (dispatch) => {
      dispatch(getRestaurantList())
      const restaurants = [];
      try {
        FirebaseService.child('items').on('value',(snap)=>{
          console.log('res: ', snap.val());
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
export function navigateToRestaurantDetail(restaurant){
  console.log('Access navigate action');
  return{
    type: NAVIGATE_TO_RESTAURANT_DETAIL,
    restaurant,
  }
}
////////////////////BOOKING FORM/////////////////////////////
export function fillDate(dateText){
  console.log('Access fill date');
  return{
    type: FILL_DATE,
    dateText,
  }
}

export function fillTime(timeText){
  console.log('Access fill time');
  return{
    type: FILL_TIME,
    timeText,
  }
}

export function fillNumOfCustomer(numOfCustomer){
  console.log('Access fill numOfCustomer');
  return{
    type: FILL_NUM_OF_CUSTOMER,
    numOfCustomer,
  }
}

export function fillPhoneNumber(phoneNumber){
  console.log('Access fill phoneNumber');
  return{
    type: FILL_PHONE_NUMBER,
    phoneNumber,
  }
}

export function fillCustomerName(customerName){
  console.log('Access fill customerName');
  return{
    type: FILL_CUSTOMER_NAME,
    customerName,
  }
}
