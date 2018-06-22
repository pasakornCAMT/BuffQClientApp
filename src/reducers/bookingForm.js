import {
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
  FILL_NUM_OF_CHILD,
  RECORD_PRICE,
  CHECKED_DRINK,
  CLEAR_FORM_DATA,
  VALIDATE_DATE,
  VALIDATE_PHONE,
  VALIDATE_NAME,
} from '../constants/constants'

let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let mindate = date+'-'+month+'-'+year;

const initailState = {
  dateText: mindate,
  timeText: '',
  selectedIndex: 0,
  numOfCustomer: 1,
  numOfChild: 0,
  customerName: '',
  phoneNumber: '',
  drink: false,
  price: 0,
  isDateText: false,
  isPhoneNumber: false,
  isCustomerName: false,
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
    case FILL_NUM_OF_CHILD:
      return{
        ...state,
        numOfChild: action.numOfChild,
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
    case VALIDATE_DATE:
      return{
        ...state,
        isDateText: true,
      }
    case VALIDATE_PHONE:
      return{
        ...state,
        isPhoneNumber: true,
      }
    case VALIDATE_NAME:
      return{
        ...state,
        isCustomerName: true,
      }
    case CLEAR_FORM_DATA:
      return {
        dateText: mindate,
        timeText: '',
        selectedIndex: 0,
        numOfCustomer: 1,
        numOfChild: 0,
        customerName: '',
        phoneNumber: '',
        drink: false,
        price: 0,
      }
    default:
      return state
  }
}
