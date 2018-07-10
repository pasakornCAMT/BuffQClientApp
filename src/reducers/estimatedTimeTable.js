import {
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
} from '../constants/constants'

const estimatedTimeTableState = {
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
      }
    case CLEAR_TABLE:
      return {
        tables: [
          {
            percentage: 0,
            time: 'xx-xxmin'
          }
        ],
      }
    default:
      return state
  }
}
