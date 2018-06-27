import restaurantReducer from '../../src/reducers/restaurant'
import {ListView} from 'react-native'
import {
  FETCHING_RESTAURANT_LIST,
  FETCHING_RESTAURANT_LIST_SUCCESS,
  FETCHING_RESTAURANT_LIST_FAILURE,
  FETCHING_BOOKINGS,
  SEARCHING_RESTAURANT_SUCCESS,
  SEARCHING_RESTAURANT_FAILURE,
  NO_MATCHED_RESTAURANT,
  NAVIGATE_TO_RESTAURANT_DETAIL,
  NO_RESTAURANT_DATA,
  CAN_BOOK,
  CAN_NOT_BOOK,
} from '../../src/constants/constants'

const restaurantState = {
  restaurants: [],
  isFetching: false,
  error: false,
  noData: false,
  noMatched: false,
  restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
  keyword: '',
  restaurant: [],
  refId: '',
  bookings:[],
  isFull: false,
}

describe('restaurants reducer', () => {
  it('has a default state', () => {
    stateAct = restaurantReducer(state = restaurantState, {type: 'unexpected'})
    expect(stateAct).toEqual({
      ...state,
    })
  });
  it('has a type FETCHING_RESTAURANT_LIST', () => {
    //Arrange
    action = {
      type: FETCHING_RESTAURANT_LIST
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      restaurants: [],
      isFetching: true,
    })
  });
  // it('has a type FETCHING_RESTAURANT_LIST_SUCCESS', () => {
  //   //Arrange
  //   action = {
  //     type: FETCHING_RESTAURANT_LIST_SUCCESS,
  //     restaurants: Object
  //   }
  //   //Act
  //   stateAct = restaurantReducer(state = restaurantState, action)
  //   //Assert
  //   expect(stateAct).toEqual({
  //     ...state,
  //     isFetching: false,
  //     noMatched: false,
  //     restaurants: action.restaurants,
  //     restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.restaurants)
  //   })
  // });
  it('has a type FETCHING_RESTAURANT_LIST_FAILURE', () => {
    //Arrange
    action = {
      type: FETCHING_RESTAURANT_LIST_FAILURE
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFetching: false,
      noMatched: false,
      error: true
    })
  });
  // it('has a type FETCHING_BOOKINGS', () => {
  //   //Arrange
  //   action = {
  //     type: FETCHING_BOOKINGS,
  //     bookings: Object
  //   }
  //   //Act
  //   stateAct = restaurantReducer(state = restaurantState, action)
  //   //Assert
  //   expect(stateAct).toEqual({
  //     ...state,
  //     bookings: action.bookings,
  //   })
  // });
  it('has a type NO_RESTAURANT_DATA', () => {
    //Arrange
    action = {
      type: NO_RESTAURANT_DATA
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFetching: false,
      noMatched: false,
      noData: true,
    })
  });
  // it('has a type SEARCHING_RESTAURANT_SUCCESS', () => {
  //   //Arrange
  //   action = {
  //     type: SEARCHING_RESTAURANT_SUCCESS,
  //     newData: Object,
  //     text: 'restaurant',
  //   }
  //   //Act
  //   stateAct = restaurantReducer(state = restaurantState, action)
  //   //Assert
  //   expect(stateAct).toEqual({
  //     ...state,
  //     restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}).cloneWithRows(action.newData),
  //     keyword: action.text,
  //     noMatched: false,
  //   })
  // });
  it('has a type NO_MATCHED_RESTAURANT', () => {
    //Arrange
    action = {
      type: NO_MATCHED_RESTAURANT,
      text: 'restaurant'
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      keyword: action.text,
      noMatched: true,
      isFetching: false,
    })
  });
  it('has a type NAVIGATE_TO_RESTAURANT_DETAIL', () => {
    //Arrange
    action = {
      type: NAVIGATE_TO_RESTAURANT_DETAIL,
      restaurant: Object,
      refId: '0',
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      restaurant: action.restaurant,
      refId: action.refId,
    })
  });
  it('has a type CAN_BOOK', () => {
    //Arrange
    action = {
      type: CAN_BOOK,
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFull: false,
    })
  });
  it('has a type CAN_NOT_BOOK', () => {
    //Arrange
    action = {
      type: CAN_NOT_BOOK,
    }
    //Act
    stateAct = restaurantReducer(state = restaurantState, action)
    //Assert
    expect(stateAct).toEqual({
      ...state,
      isFull: true,
    })
  });
});
