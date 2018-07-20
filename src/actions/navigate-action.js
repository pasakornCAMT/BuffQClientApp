import{
    NAVIGATE_TO_RESTAURANT_DETAIL,
    NAVIGATE_TO_BOOKING_DETAIL,
    INITIAL_TIME,
} from '../constants/constants'

export function preparedRestaurantDetail(restaurant, refId){
    return (dispatch) => {
      dispatch(initailRestaurantDetail(restaurant, refId))
      dispatch(initialTime(restaurant.sectionTime[0]))
    }
  }
  export function initailRestaurantDetail(restaurant, refId){
    return{
      type: NAVIGATE_TO_RESTAURANT_DETAIL,
      restaurant,
      refId,
    }
  }
  export function initialTime(timeText){
    return{
      type: INITIAL_TIME,
      timeText
    }
  }
  export function preparedBookingDetail(booking, refId){
    return{
      type: NAVIGATE_TO_BOOKING_DETAIL,
      booking,
      refId,
    }
  }