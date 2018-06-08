import {FETCHING_RESTAURANT_LIST, FETCHING_RESTAURANT_LIST_SUCCESS, FETCHING_RESTAURANT_LIST_FAILURE} from '../constants/constants'
const initailState = {
  restaurants: [],
  isFetching: false,
  error: false,
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
      }
    case FETCHING_RESTAURANT_LIST_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
