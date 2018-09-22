import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../constants/constants'

const userState = {
    user: [],
    isFetching: false,
    isError: false,
}

export default function userReducer (state = userState, action){
    switch (action.type) {
        case LOGIN_USER:
            return{
                ...state,
                isFetching: true
            }
        case LOGIN_USER_SUCCESS:
            return{
                user: action.user,
                isFetching: false,
                isError: false
            }
        case LOGIN_USER_FAILURE:
            return{
                ...state,
                isError: true,
                isFetching: false,
            }    
        default:
            return state;
    }
}