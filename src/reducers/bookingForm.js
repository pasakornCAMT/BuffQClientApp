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
  VALID_DATE,
  VALID_PHONE,
  INVALID_PHONE,
  VALID_NAME,
  INITIAL_TIME,
} from '../constants/constants'

let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let mindate = date+'-'+month+'-'+year;

const bookingFormState = {
  dateText: mindate,
  timeText: '',
  selectedIndex: 0,
  numOfCustomer: 1,
  numOfChild: 0,
  customerName: '',
  phoneNumber: '',
  drink: false,
  price: 0,
  isValidDateText: false,
  isValidPhoneNumber: false,
  isValidCustomerName: false,
}

export default function bookingReducer(state = bookingFormState, action){
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
    case VALID_DATE:
      return{
        ...state,
        isValidDateText: true,
      }
    case VALID_PHONE:
      return{
        ...state,
        isValidPhoneNumber: true,
      }
    case INVALID_PHONE:
      return{
        ...state,
        isValidPhoneNumber: false,
      }
    case VALID_NAME:
      return{
        ...state,
        isValidCustomerName: true,
      }
    case INITIAL_TIME:
      return{
        ...state,
        timeText: action.timeText,
      }
    case CLEAR_FORM_DATA:
      return {
        ...state,
        dateText: mindate,
        selectedIndex: 0,
        numOfCustomer: 1,
        numOfChild: 0,
        customerName: '',
        phoneNumber: '',
        drink: false,
        price: 0,
        isValidDateText: false,
        isValidPhoneNumber: false,
        isValidCustomerName: false,
      }
    default:
      return state
  }
}
