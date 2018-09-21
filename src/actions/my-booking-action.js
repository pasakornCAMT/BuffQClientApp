import{
    FETCHING_MY_BOOKING_LIST,
    FETCHING_MY_BOOKING_LIST_SUCCESS,
    FETCHING_MY_BOOKING_LIST_FAILURE,
    GET_RESTAURANT_BY_ID,
    NO_MY_BOOKING_DATA,
    INITIAL_MY_BOOKING,
    EDIT_BOOKING_DATE,
    EDIT_BOOKING_TIME,
    EDIT_NUM_OF_CUSTOMER,
    EDIT_NUM_OF_CHILD,
    EDIT_NUM_OF_ADULT,
    EDIT_PHONE_NUMBER,
    EDIT_CUSTOMER_NAME,
    EDIT_TIME_INDEX,
    EDIT_INCLUDE_DRINK,
    TOTAL_PRICE_CHANGED,
    PREPARE_EDITED_VALUE
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

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

export function editNumOfAdult(numOfAdult){
  return{
    type: EDIT_NUM_OF_ADULT,
    numOfAdult,
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

export function editTimeIndex(selectedIndex){
  return{
    type: EDIT_TIME_INDEX,
    selectedIndex,
  }
}

export function editIncludeDrink(){
  return{
    type: EDIT_INCLUDE_DRINK,
  }
}

export function totalPriceChanged(totalPrice){
  return{
    type: TOTAL_PRICE_CHANGED,
    totalPrice,
  }
}

export function prepareEditedValue(dateText, timeText, selectedIndex, 
  numOfCustomer, numOfAdult, numOfChild, phone, customer, includeDrink){
  return{
    type: PREPARE_EDITED_VALUE,
    dateText,
    timeText,
    selectedIndex,
    numOfCustomer,
    numOfAdult,
    numOfChild,
    phone,
    customer,
    includeDrink,
  }
}