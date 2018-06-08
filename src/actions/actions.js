import {FETCHING_RESTAURANT_LIST, FETCHING_RESTAURANT_LIST_SUCCESS, FETCHING_RESTAURANT_LIST_FAILURE} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchRestaurantFromFirebase(){
    return (dispatch) => {
      dispatch(getRestaurantList())
      const restaurants = [];
      try {
        FirebaseService.child('items').on('value',(snap)=>{
          console.log('res: ', snap.val());
          dispatch(getRestaurantListSuccess(snap.val()))
        })
      } catch (e) {
        dispatch(getRestaurantListFailure(e))
      }
    }
}

export function getRestaurantList(){
  return{
    type: FETCHING_RESTAURANT_LIST
  }
}

export function getRestaurantListSuccess(restaurants){
  return{
    type: FETCHING_RESTAURANT_LIST_SUCCESS,
    restaurants,
  }
}

export function getRestaurantListFailure(){
  return{
    type: FETCHING_RESTAURANT_LIST_FAILURE
  }
}
