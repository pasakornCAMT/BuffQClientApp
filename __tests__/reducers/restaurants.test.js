import restaurantReducer from '../../src/reducers/restaurant'
import {ListView} from 'react-native'

let initailState = {
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
    initailState = restaurantReducer(initailState,{type: 'unexpected'})
    expect(initailState).toEqual({
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
    })
  });
  it('can handle FETCHING_RESTAURANT_LIST', () => {
    initailState = restaurantReducer(initailState,{type: 'FETCHING_RESTAURANT_LIST'})
    expect(initailState).toEqual({
      restaurants: [],
      isFetching: true,
      error: false,
      noData: false,
      noMatched: false,
      restaurantDataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2}),
      keyword: '',
      restaurant: [],
      refId: '',
      bookings:[],
      isFull: false,
    })
  });
});
