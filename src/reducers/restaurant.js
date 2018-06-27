import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  FETCHING_BOOKINGS,
  SEARCHING_RESTAURANT_SUCCESS,
  SEARCHING_RESTAURANT_FAILURE,
  NO_MATCHED_RESTAURANT,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  NO_RESTAURANT_DATA,
  CAN_BOOK,
  CAN_NOT_BOOK,
} from '../constants/constants'

import {ListView} from 'react-native'

const restaurantState = {
  restaurants: [],
  isFetching: false,
  error: false,
  noData: false,
  noMatched: false,
  restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  keyword: '',
  restaurant: [],
  refId: '',
  bookings:[],
  isFull: false,
}

export default function restaurantReducer (state = restaurantState, action){
  switch (action.type) {
    case FETCHING_RESTAURANT_LIST:
      return{
        ...state,
        restaurants: [],
        isFetching: true,
      }
    case FETCHING_RESTAURANT_LIST_SUCCESS:
      return{
        ...state,
        isFetching: false,
        noMatched: false,
        restaurants: action.restaurants,
        restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.restaurants)
      }
    case FETCHING_RESTAURANT_LIST_FAILURE:
      return{
        ...state,
        isFetching: false,
        noMatched: false,
        error: true
      }
    case FETCHING_BOOKINGS:
      return{
        ...state,
        bookings: action.bookings,
      }
    case NO_RESTAURANT_DATA:
      return{
        ...state,
        isFetching: false,
        noMatched: false,
        noData: true,
      }
    case SEARCHING_RESTAURANT_SUCCESS:
      return{
        ...state,
        restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.newData),
        keyword: action.text,
        noMatched: false,
      }
    case NO_MATCHED_RESTAURANT:
      return{
        ...state,
        keyword: action.text,
        noMatched: true,
        isFetching: false,
      }
    case NAVIGATE_TO_RESTAURANT_DETAIL:
      return{
        ...state,
        restaurant: action.restaurant,
        refId: action.refId,
      }
    case CAN_BOOK:
      return{
        ...state,
        isFull: false,
      }
    case CAN_NOT_BOOK:
      return{
        ...state,
        isFull: true,
      }
    default:
      return state;
  }
}
