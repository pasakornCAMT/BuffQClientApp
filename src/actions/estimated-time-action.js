import {
    FETCHING_ESTIMATED_TIME_TABLE,
    CLEAR_TABLE,
    FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
    NO_ESTIMATED_TIME_DATA,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export var localNumOfCustomer = 1

export function setNumOfCustomer(num){
    localNumOfCustomer = num
}

export function fetchingEstimatedTimeTable(id, timeText) {
    return (dispatch) => {
        dispatch(fetchingTable())
        try {
            FirebaseService.database().ref().child('EstimatedTime')
                .child(id).child(timeText).child(localNumOfCustomer).on('value', (snap) => {
                    if(snap.val() == null ){
                        dispatch(noTableData())
                    }else{
                        dispatch(getTableSuccess(snap.val()))
                    }
                })
        } catch (e) {

        }
    }
}

export function fetchingTable() {
    return {
        type: FETCHING_ESTIMATED_TIME_TABLE
    }
}

export function clearTable() {
    return {
        type: CLEAR_TABLE,
    }
}

export function getTableSuccess(table) {
    return {
        type: FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
        table,
    }
}

export function noTableData(){
    return{
        type: NO_ESTIMATED_TIME_DATA
    }
}