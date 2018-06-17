import {
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  NO_MY_BOOKING_DATA,
  NAVIGATE_TO_BOOKING_DETAIL,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  PREPARE_EDITED_VALUE,
} from '../constants/constants'

import {ListView} from 'react-native'

const initailState = {
  myBookingList: [],
  isFetching: false,
  error: false,
  noData: false,
  myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  booking: [],
  refId: '',
  editedNumOfCustomer: '',
  editedPhoneNumber: '',
  editedCustomerName: '',
}

export default function myBookingListReducer(state = initailState, action){
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
        myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.myBookingList)
      }
    case FETCHING_MY_BOOKING_LIST_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: true,
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
    case PREPARE_EDITED_VALUE:
      return{
        ...state,
        editedNumOfCustomer: action.numOfCustomer,
        editedPhoneNumber: action.phone,
        editedCustomerName: action.customer,
      }
    default:
      return state
  }
}
