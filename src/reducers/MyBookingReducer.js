import {
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  NAVIGATE_TO_BOOKING_DETAIL,
} from '../constants/constants'

import {ListView} from 'react-native'

const initailState = {
  myBookingList: [],
  isFetching: false,
  error: false,
  myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  booking: [],
  refId: '',
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
    case NAVIGATE_TO_BOOKING_DETAIL:
      return{
        ...state,
        booking: action.booking,
        refId: action.refId,
      }
    default:
      return state
  }
}
