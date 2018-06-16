import {
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
} from '../constants/constants'

const initailState = {
  tables: [],
}

export default function estimatedTimeTableRuducer (state = initailState, action){
  switch (action.type) {
    case FETCHING_ESTIMATED_TIME_TABLE_SUCCESS:
      return{
        ...state,
        tables: action.table,
      }
    default:
      return state
  }
}
