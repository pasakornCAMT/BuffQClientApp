import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  SEARCHING_RESTAURANT_SUCCESS,
  SEARCHING_RESTAURANT_FAILURE,
  NAVIGATE_TO_RESTAURANT_DETAIL,
} from '../constants/constants'

import {ListView} from 'react-native'
const initailState = {
  restaurants: [],
  isFetching: false,
  error: false,
  restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  keyword: '',
  restaurant: [],
  refId: '',
}

export default function restaurantReducer (state = initailState, action){
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
        restaurants: action.restaurants,
        restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.restaurants)
      }
    case FETCHING_RESTAURANT_LIST_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: true
      }
    case SEARCHING_RESTAURANT_SUCCESS:
      return{
        ...state,
        restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.newData),
        keyword: action.text,
      }
    case SEARCHING_RESTAURANT_FAILURE:
      return{
        ...state,
        keyword: action.text,
      }
    case NAVIGATE_TO_RESTAURANT_DETAIL:
      return{
        ...state,
        restaurant: action.restaurant,
        refId: action.refId,
      }
    default:
      return state
  }
}
