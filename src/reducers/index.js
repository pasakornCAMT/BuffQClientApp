import { combineReducers } from 'redux'
import restaurants from './restaurant'
import bookingForm from './bookingForm'
import estimatedTimeTable from './estimatedTimeTable'
import MyBookingReducer from './MyBookingReducer'

const rootReducer = combineReducers({
    restaurants,
    bookingForm,
    estimatedTimeTable,
    MyBookingReducer,
})

export default rootReducer
