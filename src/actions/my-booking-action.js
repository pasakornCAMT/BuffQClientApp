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
    PREPARE_EDITED_VALUE,
    GET_MY_QUEUE,
    GET_MY_QUEUE_SUCCESS
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchMyBookingFromFirebase(){
    return (dispatch) => {
      var bookingIdList = [];
      dispatch(getMyBookingList())
      try {
        const user = FirebaseService.auth().currentUser;
        console.log('fetch id: ', user.uid);
        var myBookingList = [];
        FirebaseService.database().ref().child('userBookings').child(user.uid).once('value').then((snap) =>{
          if(snap.val()===null){
            dispatch(noMyBookingData())
          }
          const promisses = [];
          bookingIdList = Object.getOwnPropertyNames(snap.val())
          bookingIdList.forEach( (bookingId) => {
            const request = FirebaseService.database().ref().child('bookings').child('online').child(bookingId).once('value').then((snapshot)=>{
              myBookingList.push(snapshot.val())
            });
            promisses.push(request)
          });
          return Promise.all(promisses)
        }).then(()=>{
          console.log('sss: ',myBookingList)
          if(!myBookingList.length == 0){
            dispatch(getMyBookingListSuccess(myBookingList))
          }
        }).catch((e)=>{
          console.log(e)
        });
      } catch (e) {
        dispatch(getMyBookingListFailure())
      }
    }
}

// export const findBooking = async(listOfId) =>{
export function findBooking(listOfId){
  var myBookingList = [];
  listOfId.forEach(bookingId => {
    FirebaseService.database().ref().child('bookings').child('online').child(bookingId).on('value',  (snapshot)=>{
      myBookingList.push(snapshot.val())
    });
  }); 
  return myBookingList
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
    FirebaseService.database().ref().child('restaurants').child(refId).on('value',async (snap)=>{
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

export function getMyQueue(bookingId, dateText, resId) {
  return (dispatch) => {
    dispatch(gettingMyQueue())
    FirebaseService.database().ref().child('bookings').child('online')
    .orderByChild('status_dateText_resId').equalTo('booking_'+dateText+'_'+resId).on('value', (snap) => {
        console.log('qeue: ',snap.val())
        const count = countQueue(snap,bookingId);
        console.log(count);
        dispatch(getMyQueueSuccess(count))
       // return count
    })
  }
}

function countQueue(snap, id){
  var count = 1;
  var target = 1;
  snap.forEach(booking => {
      if(booking.val().id == id){
          target = count;
      }else{
          count++;
      }
  });
  return target;
}

export function getMyQueueSuccess(count){
  return{
    type: GET_MY_QUEUE_SUCCESS,
    count
  }
}

export function gettingMyQueue(){
  return{
    type: GET_MY_QUEUE
  }
}