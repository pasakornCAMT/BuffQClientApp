import {
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
  RECORD_PRICE,
  CHECKED_DRINK,
  CLEAR_FORM_DATA,
} from '../constants/constants'

const initailState = {
  dateText: '',
  timeText: '17:00',
  selectedIndex: 0,
  numOfCustomer: 1,
  customerName: '',
  phoneNumber: '',
  drink: false,
  price: 0,
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
        selectedIndex: action.selectedIndex,
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
    case RECORD_PRICE:
      return{
        ...state,
        price: action.price
      }
    case CHECKED_DRINK:
      return {
        ...state,
        drink: !state.drink,
      }
    case CLEAR_FORM_DATA:
        return{
          dateText: '',
          timeText: '17:00',
          selectedIndex: 0,
          numOfCustomer: '',
          customerName: '',
          phoneNumber: '',
          drink: false,
        }
    default:
      return state
  }
}
