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
  EDIT_NUM_OF_CHILD,
  EDIT_NUM_OF_CUSTOMER,
  EDIT_PHONE_NUMBER,
  EDIT_CUSTOMER_NAME,
  PREPARE_EDITED_VALUE,
  VALIDATE_DATE,
  VALIDATE_PHONE,
  VALIDATE_NAME,
} from '../../src/constants/constants'

import {
  getRestaurantList,
  getRestaurantListSuccess,
  getRestaurantListFailure,
  fetchingBookingSuccess,
  noRestaurantData,
  displayRestaurantSuccess,
  displayRestaurantFailure,
  preparedRestaurantDetail,
  preparedBookingDetail,
  fillDate,
  fillTime,
  fillNumOfCustomer,
  fillNumOfChild,
  fillPhoneNumber,
  fillCustomerName,
  recordPrice,
  checkedDrink,
  clearFormData,
  validateDate,
  validatePhone,
  validateName,
  canBook,
  cannotBook,
  clearTable,
  getTableSuccess,
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
  editPhoneNumber,
  editCustomerName,
  prepareEditedValue,

} from '../../src/actions/actions'

describe('Test action',() => {
  it('call getRestaurantList function', () => {
    stateAct = getRestaurantList();
    expect(stateAct).toEqual({
      type: FETCHING_RESTAURANT_LIST
    })
  });
  it('call getRestaurantListSuccess function', () => {
    //Arrange
    let restaurants
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
    let restaurants
    //Act
    stateAct = getRestaurantListFailure();
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_RESTAURANT_LIST_FAILURE
    })
  });
  it('call fetchingBookingSuccess function', () => {
    //Arrange
    let bookings
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
    let newData
    let text
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
    let text
    //Act
    stateAct = displayRestaurantFailure(text);
    //Assert
    expect(stateAct).toEqual({
      type: NO_MATCHED_RESTAURANT,
      text,
    });
  });
  it('call preparedRestaurantDetail function', () => {
    //Arrange
    let restaurant
    let refId
    //Act
    stateAct = preparedRestaurantDetail(restaurant, refId);
    //Assert
    expect(stateAct).toEqual({
      type: NAVIGATE_TO_RESTAURANT_DETAIL,
      restaurant,
      refId,
    });
  });
  it('call preparedBookingDetail function', () => {
    //Arrange
    let booking
    let refId
    //Act
    stateAct = preparedBookingDetail(booking, refId);
    //Assert
    expect(stateAct).toEqual({
      type: NAVIGATE_TO_BOOKING_DETAIL,
      booking,
      refId,
    });
  });
  it('call fillDate function', () => {
    //Arrange
    let dateText
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
    let selectedIndex
    let timeText
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
    let numOfCustomer
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
    let numOfChild
    //Act
    stateAct = fillNumOfChild(numOfChild);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_NUM_OF_CHILD,
      numOfChild,
    });
  });
  it('call fillPhoneNumber function', () => {
    //Arrange
    let phoneNumber
    //Act
    stateAct = fillPhoneNumber(phoneNumber);
    //Assert
    expect(stateAct).toEqual({
      type: FILL_PHONE_NUMBER,
      phoneNumber,
    });
  });
  it('call fillCustomerName function', () => {
    //Arrange
    let customerName
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
    let price
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
  it('call validateDate function', () => {
    //Act
    stateAct = validateDate();
    //Assert
    expect(stateAct).toEqual({
      type: VALIDATE_DATE
    });
  });
  it('call validatePhone function', () => {
    //Act
    stateAct = validatePhone();
    //Assert
    expect(stateAct).toEqual({
      type: VALIDATE_PHONE
    });
  });
  it('call validateName function', () => {
    //Act
    stateAct = validateName();
    //Assert
    expect(stateAct).toEqual({
      type: VALIDATE_NAME
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
  it('call getTableSuccess function', () => {
    //Arrange
    table = [];
    //Act
    stateAct = getTableSuccess(table);
    //Assert
    expect(stateAct).toEqual({
      type: FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
      table,
    });
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
    let myBookingList
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
    let timeText
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
    let numOfCustomer
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
    let numOfChild
    //Act
    stateAct = editNumOfChild(numOfChild);
    //Assert
    expect(stateAct).toEqual({
      type: EDIT_NUM_OF_CHILD,
      numOfChild,
    });
  });
  it('call editPhoneNumber function', () => {
    //Arrange
    let phone
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
    let customer
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
    let numOfCustomer
    let phone
    let customer
    //Act
    stateAct = prepareEditedValue(numOfCustomer, phone, customer);
    //Assert
    expect(stateAct).toEqual({
      type: PREPARE_EDITED_VALUE,
      numOfCustomer,
      phone,
      customer,
    });
  });
});
