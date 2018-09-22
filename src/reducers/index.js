import { combineReducers } from 'redux'
import restaurants from './restaurant'
import bookingForm from './bookingForm'
import estimatedTimeTable from './estimatedTimeTable'
import MyBookingReducer from './MyBookingReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
    restaurants,
    bookingForm,
    estimatedTimeTable,
    MyBookingReducer,
    UserReducer,
})

export default rootReducer
