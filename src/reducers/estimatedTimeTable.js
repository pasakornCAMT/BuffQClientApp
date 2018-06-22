import {
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
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
    case CLEAR_TABLE:
      return{
        tables:[],
      }
    default:
      return state
  }
}
