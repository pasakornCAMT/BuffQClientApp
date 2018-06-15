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
import {ListView} from 'react-native'
const initailState = {
  restaurants: [],
  isFetching: false,
  error: false,
  restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  keyword: '',
  restaurant: [],
  dateText: '',
  timeText: '',
  numOfCustomer: '',
  customerName: '',
  phoneNumber: '',
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
      console.log('Access reducer');
      return{
        ...state,
        restaurant: action.restaurant,
      }
      case FILL_DATE:
        return{
          ...state,
          dateText: action.dateText,
        }
      case FILL_TIME:
        return{
          ...state,
          timeText: action.timeText,
        }
      case FILL_NUM_OF_CUSTOMER:
        return{
          ...state,
          numOfCustomer: action.numOfCustomer,
        }
      case FILL_PHONE_NUMBER:
        return {
          ...state,
          phoneNumber: action.phoneNumber,
        }
      case FILL_CUSTOMER_NAME:
        return {
          ...state,
          customerName: action.customerName,
        }
    default:
      return state
  }
}
