import {
    FILL_DATE,
    FILL_TIME,
    FILL_NUM_OF_CUSTOMER,
    FILL_NUM_OF_CHILD,
    FILL_PHONE_NUMBER,
    FILL_CUSTOMER_NAME,
    RECORD_PRICE,
    CHECKED_DRINK,
    CLEAR_FORM_DATA,
    VALID_DATE,
    VALID_PHONE,
    INVALID_PHONE,
    VALID_NAME,
    CAN_BOOK,
    CAN_NOT_BOOK,
} from '../constants/constants'
import FirebaseService from '../services/firebase-service'

export function fillDate(dateText) {
    return {
        type: FILL_DATE,
        dateText,
    }
}

export function fillTime(selectedIndex, timeText) {
    return {
        type: FILL_TIME,
        selectedIndex,
        timeText,
    }
}

export function fillNumOfCustomer(numOfCustomer) {
    return {
        type: FILL_NUM_OF_CUSTOMER,
        numOfCustomer,
    }
}

export function fillNumOfChild(numOfChild) {
    return {
        type: FILL_NUM_OF_CHILD,
        numOfChild,
    }
}

export function fillPhoneNumber(phoneNumber) {
    return (dispatch) => {
        dispatch(onChangingPhoneNumber(phoneNumber))
        if (phoneNumber.length == 10 && phoneNumber.startsWith("0")) {
            dispatch(validPhone())
        } else {
            dispatch(invalidPhone())
        }
    }
}

export function onChangingPhoneNumber(phoneNumber) {
    return {
        type: FILL_PHONE_NUMBER,
        phoneNumber,
    }
}

export function fillCustomerName(customerName) {
    return {
        type: FILL_CUSTOMER_NAME,
        customerName,
    }
}

export function recordPrice(price) {
    return {
        type: RECORD_PRICE,
        price,
    }
}

export function checkedDrink() {
    return {
        type: CHECKED_DRINK,
    }
}

export function clearFormData() {
    return {
        type: CLEAR_FORM_DATA
    }
}

//Validate//
export function validDate() {
    return {
        type: VALID_DATE
    }
}

export function validPhone() {
    return {
        type: VALID_PHONE
    }
}

export function invalidPhone() {
    return {
        type: INVALID_PHONE
    }
}

export function validName() {
    return {
        type: VALID_NAME
    }
}

export function checkNumOfCustomer(resId, dateText, timeText, customer) {
    return (dispatch) => {
        let maximum = 0;
        FirebaseService.database().ref().child('restaurants').child(resId).on('value', (snap) => {
            maximum = snap.val().maximumPerRound;
        });
        console.log('max queue: ', maximum);
        let numOfCustomer = 0;
        try {
            FirebaseService.database().ref().child('bookings').child('users').child('1')
                .orderByChild('dateText_timeText').equalTo(dateText + '_' + timeText).on('value', (snap) => {
                    console.log('booking: ', snap.val());
                    for (let booking in snap.val()) {
                        numOfCustomer = numOfCustomer + snap.val()[booking].numOfCustomer;
                    }
                    console.log('current queue:', numOfCustomer);
                    if ((maximum - numOfCustomer) < customer) {
                        console.log('cannot book');
                        dispatch(cannotBook())
                    } else {
                        console.log('can book');
                        dispatch(canBook())
                    }
                });
        } catch (e) {
            console.log('can book excep');
            dispatch(canBook())
        }
    }
}

export function canBook() {
    return {
        type: CAN_BOOK
    }
}

export function cannotBook() {
    return {
        type: CAN_NOT_BOOK
    }
}