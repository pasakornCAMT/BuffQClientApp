import bookingReducer from '../../src/reducers/bookingForm'
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
} from '../../src/constants/constants'

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
  isDateText: false,
  isPhoneNumber: false,
  isCustomerName: false,
}

describe('booking reducer', () => {
  it('has a default state', () => {
    state = bookingReducer(undefined, {type: 'unexpected'})
    expect(state).toEqual({
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
    });
  });
  it('has a type FILL_DATE' , ()=>{
    //Arrange
    action = {
      type: FILL_DATE,
      dateText: '30-06-2018'
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      dateText: action.dateText,
    });
  });
  it('has a type FILL_TIME' , ()=>{
    //Arrange
    action = {
      type: FILL_TIME,
      timeText: '19:00'
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      timeText: action.timeText,
    });
  });
  it('has a type FILL_NUM_OF_CUSTOMER' , ()=>{
    //Arrange
    action = {
      type: FILL_NUM_OF_CUSTOMER,
      numOfCustomer: 6
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      numOfCustomer: action.numOfCustomer,
    });
  });
  it('has a type FILL_NUM_OF_CHILD' , ()=>{
    //Arrange
    action = {
      type: FILL_NUM_OF_CHILD,
      numOfChild: 2
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      numOfChild: action.numOfChild,
    });
  });
  it('has a type FILL_PHONE_NUMBER' , ()=>{
    //Arrange
    action = {
      type: FILL_PHONE_NUMBER,
      phoneNumber: '0988983739'
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      phoneNumber: action.phoneNumber,
    });
  });
  it('has a type FILL_CUSTOMER_NAME' , ()=>{
    //Arrange
    action = {
      type: FILL_CUSTOMER_NAME,
      customerName: 'Peter'
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      customerName: action.customerName,
    });
  });
  it('has a type RECORD_PRICE' , ()=>{
    //Arrange
    action = {
      type: RECORD_PRICE,
      price: 1999
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      price: action.price,
    });
  });
  it('has a type RECORD_PRICE' , ()=>{
    //Arrange
    action = {
      type: RECORD_PRICE,
      price: 1999
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      price: action.price,
    });
  });
  it('has a type CHECKED_DRINK, false=>true' , ()=>{
    //Arrange
    action = {
      type: CHECKED_DRINK
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      drink: true
    });
  });
  it('has a type CHECKED_DRINK, true=>false' , ()=>{
    //Arrange
    const secondState = {
      dateText: mindate,
      timeText: '',
      selectedIndex: 0,
      numOfCustomer: 1,
      numOfChild: 0,
      customerName: '',
      phoneNumber: '',
      drink: true,
      price: 0,
      isDateText: false,
      isPhoneNumber: false,
      isCustomerName: false,
    }
    state = bookingReducer(state = secondState,{
      type: CHECKED_DRINK
    });
    expect(state).toEqual({
      ...state,
      drink: false
    });
  });
  it('has a type VALIDATE_DATE' , ()=>{
    action={
      type: VALIDATE_DATE
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      isDateText: true
    });
  });
  it('has a type VALIDATE_PHONE' , ()=>{
    action={
      type: VALIDATE_PHONE
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      isPhoneNumber: true
    });
  });
  it('has a type VALIDATE_NAME' , ()=>{
    action={
      type: VALIDATE_NAME
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
      ...state,
      isCustomerName: true
    });
  });
  it('has a type CLEAR_FORM_DATA' , ()=>{
    action={
      type: CLEAR_FORM_DATA
    }
    state = bookingReducer(state = bookingFormState, action);
    expect(state).toEqual({
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
    });
  });
});
