import {
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
} from '../constants/constants'

const initailState = {
  dateText: '',
  timeText: '',
  numOfCustomer: '',
  customerName: '',
  phoneNumber: '',
}

export default function bookingReducer (state = initailState, action){
  switch (action.type) {
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
