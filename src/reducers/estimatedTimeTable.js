import {
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
  FETCHING_ESTIMATED_TIME_TABLE,
} from '../constants/constants'

const estimatedTimeTableState = {
  isFetching: false,
  tables: [
    {
      percentage: 0,
      time: 'xx-xxmin'
    }
  ],
}

export default function estimatedTimeTableRuducer (state = estimatedTimeTableState, action){
  switch (action.type) {
    case FETCHING_ESTIMATED_TIME_TABLE_SUCCESS:
      return{
        tables: action.table,
        isFetching: false,
      }
    case FETCHING_ESTIMATED_TIME_TABLE:
      return{
        ...state,
        isFetching: true,
      }
    case CLEAR_TABLE:
      return {
        tables: [
          {
            percentage: 0,
            time: 'xx-xxmin'
          }
        ],
        isFetching: false,
      }
    default:
      return state
  }
}
