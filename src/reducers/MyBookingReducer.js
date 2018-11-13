import {
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  GET_RESTAURANT_BY_ID,
  NO_MY_BOOKING_DATA,
  INITIAL_MY_BOOKING,
  NAVIGATE_TO_BOOKING_DETAIL,
  EDIT_BOOKING_DATE,
  EDIT_BOOKING_TIME,
  EDIT_NUM_OF_CHILD,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  EDIT_TIME_INDEX,
  PREPARE_EDITED_VALUE,
  EDIT_NUM_OF_ADULT,
  EDIT_INCLUDE_DRINK,
  TOTAL_PRICE_CHANGED,
  GET_MY_QUEUE,
  GET_MY_QUEUE_SUCCESS
} from '../constants/constants'

import {ListView} from 'react-native'

const myBookingState = {
  myBookingList: [],
  restaurant:[],
  isFetching: false,
  error: false,
  noData: false,
  myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  booking: [],
  refId: '',
  editedBookingDate:'',
  editedBookingTime:'',
  selectedIndex:0,
  editedNumOfCustomer: 1,
  editedNumOfAdult: 1,
  editedNumOfChild:0,
  editedPhoneNumber: '',
  editedCustomerName: '',
  editedIncludeDrink: false,
  totalPriceChanged: 0,
  myQueue: 999,
  gettingMyQueue: false
}

export default function myBookingListReducer(state = myBookingState, action){
  switch (action.type) {
    case FETCHING_MY_BOOKING_LIST:
      return{
        ...state,
        myBookingList: [],
        isFetching: true,
      }
    case FETCHING_MY_BOOKING_LIST_SUCCESS:
      return{
        ...state,
        myBookingList: action.myBookingList,
        isFetching: false,
        noData: false,
        myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.myBookingList)
      }
    case FETCHING_MY_BOOKING_LIST_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: true,
        noData: false,
      }
    case GET_RESTAURANT_BY_ID:
      return{
        ...state,
        restaurant: action.restaurant,
      }
    case NO_MY_BOOKING_DATA:
      return{
        ...state,
        isFetching: false,
        noData: true,
      }
    case NAVIGATE_TO_BOOKING_DETAIL:
      return{
        ...state,
        booking: action.booking,
        refId: action.refId,
        //editedIncludeDrink: action.booking.includeDrink,
      }
    case EDIT_BOOKING_DATE:
      return{
        ...state,
        editedBookingDate: action.dateText,
      }
    case EDIT_BOOKING_TIME:
      return{
        ...state,
        editedBookingTime: action.timeText,
      }
    case EDIT_NUM_OF_CHILD:
      return{
        ...state,
        editedNumOfChild: action.numOfChild,
      }
    case EDIT_NUM_OF_ADULT:
      return{
        ...state,
        editedNumOfAdult: action.numOfAdult,
      }  
    case EDIT_NUM_OF_CUSTOMER:
      return{
        ...state,
        editedNumOfCustomer: action.numOfCustomer,
      }
    case EDIT_PHONE_NUMBER:
      return{
        ...state,
        editedPhoneNumber: action.phone,
      }
    case EDIT_CUSTOMER_NAME:
      return{
        ...state,
        editedCustomerName: action.customer,
      }
    case EDIT_TIME_INDEX:
      return{
        ...state,
        selectedIndex: action.selectedIndex,
      }
    case EDIT_INCLUDE_DRINK:
      return{
        ...state,
        editedIncludeDrink: !state.editedIncludeDrink,
      }
    case TOTAL_PRICE_CHANGED:
      return{
        ...state,
        totalPriceChanged: action.totalPrice,
      }   
    case PREPARE_EDITED_VALUE:
      return{
        ...state,
        editedBookingDate: action.dateText,
        editedBookingTime: action.timeText,
        selectedIndex: action.selectedIndex,
        editedNumOfCustomer: action.numOfCustomer,
        editedNumOfAdult: action.numOfAdult,
        editedNumOfChild: action.numOfChild,
        editedPhoneNumber: action.phone,
        editedCustomerName: action.customer,
        editedIncludeDrink: action.includeDrink,
      }
    case GET_MY_QUEUE:
      return {
        ...state,
        gettingMyQueue: true
      }   
    case GET_MY_QUEUE_SUCCESS:
      return{
        ...state,
        myQueue: action.count,
        gettingMyQueue: false
      }   
    default:
      return state
  }
}
