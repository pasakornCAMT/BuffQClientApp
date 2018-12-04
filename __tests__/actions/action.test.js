import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  FETCHING_BOOKINGS,
  NO_RESTAURANT_DATA,
  SEARCHING_RESTAURANT_SUCCESS,
  NO_MATCHED_RESTAURANT,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  NAVIGATE_TO_BOOKING_DETAIL,
  INITIAL_TIME,
  FILL_DATE,
  FILL_TIME,
  FILL_NUM_OF_CUSTOMER,
  FILL_NUM_OF_CHILD,
  FILL_PHONE_NUMBER,
  FILL_CUSTOMER_NAME,
  RECORD_PRICE,
  CHECKED_DRINK,
  CLEAR_FORM_DATA,
  CAN_BOOK,
  CAN_NOT_BOOK,
  FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
  CLEAR_TABLE,
  FETCHING_MY_BOOKING_LIST,
  FETCHING_MY_BOOKING_LIST_SUCCESS,
  FETCHING_MY_BOOKING_LIST_FAILURE,
  GET_RESTAURANT_BY_ID,
  NO_MY_BOOKING_DATA,
  INITIAL_MY_BOOKING,
  EDIT_BOOKING_DATE,
  EDIT_BOOKING_TIME,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_NUM_OF_CHILD,
  EDIT_NUM_OF_ADULT,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  EDIT_TIME_INDEX,
  EDIT_INCLUDE_DRINK,
  TOTAL_PRICE_CHANGED,
  PREPARE_EDITED_VALUE,
  GET_MY_QUEUE,
  GET_MY_QUEUE_SUCCESS,
  VALID_DATE,
  VALID_PHONE,
  INVALID_PHONE,
  VALID_NAME,
  FETCHING_ESTIMATED_TIME_TABLE,
  NO_ESTIMATED_TIME_DATA
} from '../../src/constants/constants'

import {
  getMyBookingList,
  getMyBookingListSuccess,
  getMyBookingListFailure,
  getRestaurantById,
  getRestaurantSuccess,
  noMyBookingData,
  initialMyBooking,
  editBookingDate,
  editBookingTime,
  editNumOfCustomer,
  editNumOfChild,
  editNumOfAdult,
  editTimeIndex,
  editIncludeDrink,
  totalPriceChanged,
  editPhoneNumber,
  editCustomerName,
  prepareEditedValue,
  getMyQueueSuccess,
  gettingMyQueue

} from '../../src/actions/my-booking-action'

import {
  getRestaurantList,
  getRestaurantListSuccess,
  getRestaurantListFailure,
  fetchingBookingSuccess,
  noRestaurantData,
} from '../../src/actions/restaurant-action'

import {
  displayRestaurantSuccess,
  displayRestaurantFailure,
} from '../../src/actions/search-action'

import {
  preparedBookingDetail,
  initailRestaurantDetail,
  initialTime,
} from '../../src/actions/navigate-action'

import {
  fillDate,
  fillTime,
  fillNumOfCustomer,
  fillNumOfChild,
  onChangingPhoneNumber,
  fillCustomerName,
  recordPrice,
  checkedDrink,
  clearFormData,
  validDate,
  validPhone,
  invalidPhone,
  validName,
  canBook,
  cannotBook,
} from '../../src/actions/booking-form-action'

import {
  clearTable,
  getTableSuccess,
  fetchingTable,
  noTableData,
  localNumOfCustomer,
  setNumOfCustomer
} from '../../src/actions/estimated-time-action'

describe('Test action',() => {
  it('call getRestaurantList function', () => {
    stateAct = getRestaurantList();
    expect(stateAct).toEqual({
      type: FETCHING_RESTAURANT_LIST
    })
  });
  it('call getRestaurantListSuccess function', () => {
    //Arrange
    let restaurants = [
      {id: '5WmrSonECnNqBLIUQzlgA7i4T0I3', name: 'Mhu-song-chan'},
      {id: 'c4mckr5Ta6ay73B7uy8jFMWZ0qg2', name: 'Retro Steak Cafe'},
      {id: 'mZSFYS6npwNwffsD32OPbZNCSVg2', name: 'Eim-dee'},
      {id: 'vYVi6SU1uHOv4EQ5y0WsQ3PeDT22', name: 'Chill House'},
    ]
    //Act
    stateAct = getRestaurantListSuccess(restaurants);
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_RESTAURANT_LIST_SUCCESS,
      restaurants,
    })
  });
  it('call getRestaurantListFailure function', () => {
    //Arrange
    
    //Act
    stateAct = getRestaurantListFailure();
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_RESTAURANT_LIST_FAILURE
    })
  });
  it('call fetchingBookingSuccess function', () => {
    //Arrange
    let bookings = [
      {id: '-LS-XCbS5sCVm47B1PDo', dateText: '24-11-2018', timeText: '19:25', customer: 'Test'},
      {id: '-LQP8rP-C0oWmv9ogu57', dateText: '3-11-2018', timeText: '17:00', customer: 'Fuu'},
    ]
    //Act
    stateAct = fetchingBookingSuccess(bookings);
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_BOOKINGS,
      bookings,
    })
  });
  it('call noRestaurantData function', () => {
    //Act
    stateAct = noRestaurantData();
    //Assert
    expect(stateAct).toEqual({
      type: NO_RESTAURANT_DATA
    });
  });
  it('call displayRestaurantSuccess function', () => {
    //Arrange
    let newData = [
      {id: '5WmrSonECnNqBLIUQzlgA7i4T0I3', name: 'Mhu-song-chan'}
    ]
    let text = 'Mhu-song-chan'
    //Act
    stateAct = displayRestaurantSuccess(newData,text);
    //Assert
    expect(stateAct).toEqual({
      type: SEARCHING_RESTAURANT_SUCCESS,
      newData,
      text,
    });
  });
  it('call displayRestaurantFailure function', () => {
    //Arrange
    let text = 'abc'
    //Act
    stateAct = displayRestaurantFailure(text);
    //Assert
    expect(stateAct).toEqual({
      type: NO_MATCHED_RESTAURANT,
      text,
    });
  });
  it('call initailRestaurantDetail function', () => {
    //Arrange
    let restaurant = {id: '5WmrSonECnNqBLIUQzlgA7i4T0I3', name: 'Mhu-song-chan'}
    let refId = '5WmrSonECnNqBLIUQzlgA7i4T0I3'
    //Act
    stateAct = initailRestaurantDetail(restaurant, refId);
    //Assert
    expect(stateAct).toEqual({
      type: NAVIGATE_TO_RESTAURANT_DETAIL,
      restaurant,
      refId,
    });
  });
  it('call preparedBookingDetail function', () => {
    //Arrange
    let booking =  {id: '-LS-XCbS5sCVm47B1PDo', dateText: '24-11-2018', timeText: '19:25', customer: 'Test'}
    let refId = '-LS-XCbS5sCVm47B1PDo'
    //Act
    stateAct = preparedBookingDetail(booking, refId);
    //Assert
    expect(stateAct).toEqual({
      type: NAVIGATE_TO_BOOKING_DETAIL,
      booking,
      refId,
    });
  });
  it('call initialTime function', () => {
    //Arrange
    let timeText = '17:00'
    //Act
    stateAct = initialTime(timeText);
    //Assert
    expect(stateAct).toEqual({
      type: INITIAL_TIME,
      timeText
    });
  });
  it('call fillDate function', () => {
    //Arrange
    let dateText = '24-11-2018'
    //Act
    stateAct = fillDate(dateText);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_DATE,
      dateText,
    });
  });
  it('call fillTime function', () => {
    //Arrange
    let selectedIndex = '0'
    let timeText = '17:00'
    //Act
    stateAct = fillTime(selectedIndex, timeText);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_TIME,
      selectedIndex,
      timeText,
    });
  });
  it('call fillNumOfCustomer function', () => {
    //Arrange
    let numOfCustomer = 2
    //Act
    stateAct = fillNumOfCustomer(numOfCustomer);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_NUM_OF_CUSTOMER,
      numOfCustomer,
    });
  });
  it('call fillNumOfChild function', () => {
    //Arrange
    let numOfChild = 1
    //Act
    stateAct = fillNumOfChild(numOfChild);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_NUM_OF_CHILD,
      numOfChild,
    });
  });
  it('call onChangingPhoneNumber function', () => {
    //Arrange
    let phoneNumber = '0988382738'
    //Act
    stateAct = onChangingPhoneNumber(phoneNumber);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_PHONE_NUMBER,
      phoneNumber,
    });
  });
  it('call fillCustomerName function', () => {
    //Arrange
    let customerName = 'pasakorn'
    //Act
    stateAct = fillCustomerName(customerName);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_CUSTOMER_NAME,
      customerName,
    });
  });
  it('call recordPrice function', () => {
    //Arrange
    let price= 189
    //Act
    stateAct = recordPrice(price);
    //Assert
    expect(stateAct).toEqual({
      type: RECORD_PRICE,
      price,
    });
  });
  it('call checkedDrink function', () => {
    //Act
    stateAct = checkedDrink();
    //Assert
    expect(stateAct).toEqual({
      type: CHECKED_DRINK,
    });
  });
  it('call clearFormData function', () => {
    //Act
    stateAct = clearFormData();
    //Assert
    expect(stateAct).toEqual({
      type: CLEAR_FORM_DATA
    });
  });
  it('call validDate function', () => {
    //Act
    stateAct = validDate();
    //Assert
    expect(stateAct).toEqual({
      type: VALID_DATE
    });
  });
  it('call validPhone function', () => {
    //Act
    stateAct = validPhone();
    //Assert
    expect(stateAct).toEqual({
      type: VALID_PHONE
    });
  });
  it('call invalidPhone function', () => {
    //Act
    stateAct = invalidPhone();
    //Assert
    expect(stateAct).toEqual({
      type: INVALID_PHONE
    });
  });
  it('call validName function', () => {
    //Act
    stateAct = validName();
    //Assert
    expect(stateAct).toEqual({
      type: VALID_NAME
    });
  });
  it('call canBook function', () => {
    //Act
    stateAct = canBook();
    //Assert
    expect(stateAct).toEqual({
      type: CAN_BOOK
    });
  });
  it('call cannotBook function', () => {
    //Act
    stateAct = cannotBook();
    //Assert
    expect(stateAct).toEqual({
      type: CAN_NOT_BOOK
    });
  });
  it('call fetchingTable function', () => {
    //Arrange
    
    //Act
    stateAct = fetchingTable();
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_ESTIMATED_TIME_TABLE
    });
  });
  it('call getTableSuccess function', () => {
    //Arrange
    table = [
      {table: 1 , seat: 4},
      {table: 2 , seat: 4},
      {table: 3 , seat: 8},
    ];
    //Act
    stateAct = getTableSuccess(table);
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
      table,
    });
  });
  it('call noTableData function', () => {
    //Arrange
    
    //Act
    stateAct = noTableData();
    //Assert
    expect(stateAct).toEqual({
      type: NO_ESTIMATED_TIME_DATA
    });
  });
  it('call setNumOfCustomer function', () => {
    //Arrange
    num = 2
    //Act
    setNumOfCustomer(num);
    //Assert
    expect(localNumOfCustomer).toEqual(2);
  });
  it('call getMyBookingList function', () => {
    //Act
    stateAct = getMyBookingList();
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_MY_BOOKING_LIST
    });
  });
  it('call getMyBookingListSuccess function', () => {
    //Arrange
    let myBookingList = [
      {id: '-LS-XCbS5sCVm47B1PDo', dateText: '24-11-2018', timeText: '19:25', customer: 'pasakorn'},
      {id: '-LQP8rP-C0oWmv9ogu57', dateText: '3-11-2018', timeText: '17:00', customer: 'pasakorn'},
    ]
    //Act
    stateAct = getMyBookingListSuccess(myBookingList);
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_MY_BOOKING_LIST_SUCCESS,
      myBookingList,
    });
  });
  it('call getMyBookingListFailure function', () => {
    //Act
    stateAct = getMyBookingListFailure();
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_MY_BOOKING_LIST_FAILURE
    });
  });
  it('call getRestaurantSuccess function', () => {
    //Arrange
    let restaurant
    //Act
    stateAct = getRestaurantSuccess(restaurant);
    //Assert
    expect(stateAct).toEqual({
      type: GET_RESTAURANT_BY_ID,
      restaurant,
    });
  });
  it('call noMyBookingData function', () => {
    //Act
    stateAct = noMyBookingData();
    //Assert
    expect(stateAct).toEqual({
      type: NO_MY_BOOKING_DATA
    });
  });
  it('call initialMyBooking function', () => {
    //Act
    stateAct = initialMyBooking();
    //Assert
    expect(stateAct).toEqual({
      type: INITIAL_MY_BOOKING
    });
  });
  it('call editBookingDate function', () => {
    //Arrange
    let dateText
    //Act
    stateAct = editBookingDate(dateText);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_BOOKING_DATE,
      dateText,
    });
  });
  it('call editBookingTime function', () => {
    //Arrange
    let timeText = '17:00'
    //Act
    stateAct = editBookingTime(timeText);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_BOOKING_TIME,
      timeText,
    });
  });
  it('call editNumOfCustomer function', () => {
    //Arrange
    let numOfCustomer = 2
    //Act
    stateAct = editNumOfCustomer(numOfCustomer);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_NUM_OF_CUSTOMER,
      numOfCustomer,
    });
  });
  it('call editNumOfChild function', () => {
    //Arrange
    let numOfChild = 1
    //Act
    stateAct = editNumOfChild(numOfChild);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_NUM_OF_CHILD,
      numOfChild,
    });
  });
  it('call editNumOfAdult function', () => {
    //Arrange
    let numOfAdult = 1
    //Act
    stateAct = editNumOfAdult(numOfAdult);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_NUM_OF_ADULT,
      numOfAdult,
    });
  });
  it('call editTimeIndex function', () => {
    //Arrange
    let selectedIndex = 1
    //Act
    stateAct = editTimeIndex(selectedIndex);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_TIME_INDEX,
      selectedIndex,
    });
  });
  it('call editIncludeDrink function', () => {
    //Arrange

    //Act
    stateAct = editIncludeDrink();
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_INCLUDE_DRINK,
    });
  });
  it('call totalPriceChanged function', () => {
    //Arrange
    let totalPrice = 189
    //Act
    stateAct = totalPriceChanged(totalPrice);
    //Assert
    expect(stateAct).toEqual({
      type: TOTAL_PRICE_CHANGED,
      totalPrice
    });
  });
  it('call editPhoneNumber function', () => {
    //Arrange
    let phone = '0988473857'
    //Act
    stateAct = editPhoneNumber(phone);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_PHONE_NUMBER,
      phone,
    });
  });
  it('call editCustomerName function', () => {
    //Arrange
    let customer = 'pasakorn'
    //Act
    stateAct = editCustomerName(customer);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_CUSTOMER_NAME,
      customer,
    });
  });
  it('call prepareEditedValue function', () => {
    //Arrange
    var dateText = '17-12-2018'
    var timeText = '17:00'
    var selectedIndex = 0
    var numOfCustomer = 1
    var numOfAdult = 1
    var numOfChild = 0
    var phone = '0989982932'
    var customer = 'pasakorn'
    var includeDrink= true
    //Act
    stateAct = prepareEditedValue(dateText, timeText, selectedIndex, 
      numOfCustomer, numOfAdult, numOfChild, phone, customer, includeDrink);
    //Assert
    expect(stateAct).toEqual({
      type: PREPARE_EDITED_VALUE,
      dateText,
      timeText,
      selectedIndex,
      numOfCustomer,
      numOfAdult,
      numOfChild,
      phone,
      customer,
      includeDrink,
    });
  });
  it('call getMyQueueSuccess function', () => {
    //Arrange
    let count = 4
    //Act
    stateAct = getMyQueueSuccess(count);
    //Assert
    expect(stateAct).toEqual({
      type: GET_MY_QUEUE_SUCCESS,
      count,
    });
  });
  it('call gettingMyQueue function', () => {
    //Arrange

    //Act
    stateAct = gettingMyQueue();
    //Assert
    expect(stateAct).toEqual({
      type: GET_MY_QUEUE,
    });
  });
});
