import {
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
  FETCHING_ESTIMATED_TIME_TABLE,
  NO_ESTIMATED_TIME_DATA,
} from '../constants/constants'

const estimatedTimeTableState = {
  isFetching: false,
  tables: [
    {
      percentage: 0,
      time: 'xx-xxmin'
    }
  ],
  notEnoughData: false
}

export default function estimatedTimeTableRuducer (state = estimatedTimeTableState, action){
  switch (action.type) {
    case FETCHING_ESTIMATED_TIME_TABLE_SUCCESS:
      return{
        tables: action.table,
        isFetching: false,
        notEnoughData: false,
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
    case NO_ESTIMATED_TIME_DATA:
      return {
        tables: [
          {
            percentage: 0,
            time: 'xx-xxmin'
          }
        ],
        notEnoughData: true
      }   
    default:
      return state
  }
}
