import {
    FETCHING_ESTIMATED_TIME_TABLE,
    CLEAR_TABLE,
    FETCHING_ESTIMATED_TIME_TABLE_SUCCESS,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fetchingEstimatedTimeTable(id, timeText) {
    return (dispatch) => {
        dispatch(fetchingTable())
        try {
            FirebaseService.database().ref().child('EstimatedTime')
                .child(id).child(timeText).on('value', (snap) => {
                    dispatch(getTableSuccess(snap.val()))
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