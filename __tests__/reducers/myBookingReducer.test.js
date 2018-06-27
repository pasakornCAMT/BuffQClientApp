import myBookingListReducer from '../../src/reducers/MyBookingReducer'
import {ListView} from 'react-native'
import {
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  GET_RESTAURANT_BY_ID,
  NO_MY_BOOKING_DATA,
  INITIAL_MY_BOOKING,
  NAVIGATE_TO_BOOKING_DETAIL,
  EDIT_BOOKING_DATE,
  EDIT_BOOKING_TIME,
  EDIT_NUM_OF_CHILD,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  PREPARE_EDITED_VALUE,
} from '../../src/constants/constants'
import FirebaseService from '../../src/services/firebase-service'

const myBookingState = {
  myBookingList: [],
  restaurant:[],
  isFetching: false,
  error: false,
  noData: false,
  myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  booking: [],
  refId: '',
  editedBookingDate:'',
  editedBookingTime:'',
  editedNumOfCustomer: 1,
  editedNumOfChild:0,
  editedPhoneNumber: '',
  editedCustomerName: '',
}

describe('my-booking reducer', () => {
  it('has a default state', () => {
    stateAct = myBookingListReducer(state = myBookingState, {type: 'unexpected'})
    expect(stateAct).toEqual({
      ...state,
    });
  });
  it('has a type FETCHING_MY_BOOKING_LIST', () => {
    //Arrange
    action = {
      type: FETCHING_MY_BOOKING_LIST,
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      myBookingList: [],
      isFetching: true,
    });
  });
  // it('has a type FETCHING_MY_BOOKING_LIST_SUCCESS', () => {
  //   //Arrange
  //   action = {
  //     type: FETCHING_MY_BOOKING_LIST_SUCCESS,
  //     myBookingList: Object,
  //   }
  //   //Act
  //   stateAct = myBookingListReducer(state = myBookingState, action)
  //   //Assert
  //   expect(stateAct).toEqual({
  //     ...state,
  //     myBookingList: action.myBookingList,
  //     isFetching: false,
  //     noData: false,
  //     myBookingDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.myBookingList)
  //   });
  // });
  it('has a type FETCHING_MY_BOOKING_LIST_FAILURE', () => {
    //Arrange
    action = {
      type: FETCHING_MY_BOOKING_LIST_FAILURE,
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFetching: false,
      error: true,
      noData: false,
    });
  });
  it('has a type GET_RESTAURANT_BY_ID', () => {
    //Arrange
    action = {
      type: GET_RESTAURANT_BY_ID,
      restaurant: Object
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      restaurant: action.restaurant,
    });
  });
  it('has a type NO_MY_BOOKING_DATA', () => {
    //Arrange
    action = {
      type: NO_MY_BOOKING_DATA,
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFetching: false,
      noData: true,
    });
  });
  it('has a type NAVIGATE_TO_BOOKING_DETAIL', () => {
    //Arrange
    action = {
      type: NAVIGATE_TO_BOOKING_DETAIL,
      booking: Object,
      refId: 'id'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      booking: action.booking,
      refId: action.refId,
    });
  });
  it('has a type EDIT_BOOKING_DATE', () => {
    //Arrange
    action = {
      type: EDIT_BOOKING_DATE,
      dateText: '30-06-2018'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedBookingDate: action.dateText,
    });
  });
  it('has a type EDIT_BOOKING_TIME', () => {
    //Arrange
    action = {
      type: EDIT_BOOKING_TIME,
      timeText: '19:00'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedBookingTime: action.timeText,
    });
  });
  it('has a type EDIT_NUM_OF_CHILD', () => {
    //Arrange
    action = {
      type: EDIT_NUM_OF_CHILD,
      numOfChild: '4'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedNumOfChild: action.numOfChild,
    });
  });
  it('has a type EDIT_NUM_OF_CUSTOMER', () => {
    //Arrange
    action = {
      type: EDIT_NUM_OF_CUSTOMER,
      numOfCustomer: '3'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedNumOfCustomer: action.numOfCustomer,
    });
  });
  it('has a type EDIT_PHONE_NUMBER', () => {
    //Arrange
    action = {
      type: EDIT_PHONE_NUMBER,
      phone: '3'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedPhoneNumber: action.phone,
    });
  });
  it('has a type EDIT_CUSTOMER_NAME', () => {
    //Arrange
    action = {
      type: EDIT_CUSTOMER_NAME,
      customer: 'Robert'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedCustomerName: action.customer,
    });
  });
  it('has a type PREPARE_EDITED_VALUE', () => {
    //Arrange
    action = {
      type: PREPARE_EDITED_VALUE,
      numOfCustomer: 4,
      phone:'0988989283',
      customer: 'Pun'
    }
    //Act
    stateAct = myBookingListReducer(state = myBookingState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      editedNumOfCustomer: action.numOfCustomer,
      editedPhoneNumber: action.phone,
      editedCustomerName: action.customer,
    });
  });
});
