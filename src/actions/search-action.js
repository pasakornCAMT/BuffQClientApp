import {
    SEARCHING_RESTAURANT_SUCCESS,
    NO_MATCHED_RESTAURANT,
} from '../constants/constants'

export function searchingRestaurant(restaurants, text) {
    return (dispatch) => {
        
        const newData = Object.values(restaurants).filter(function (restaurant) {
            const restaurantData = restaurant.name.toUpperCase()
            const textData = text.toUpperCase()
            return restaurantData.indexOf(textData) > -1
        })
        
        
        if (newData.length === 0 || newData === null) {
            dispatch(displayRestaurantFailure(text))
        }else{
            dispatch(displayRestaurantSuccess(newData, text))
        }

    }
}

export function displayRestaurantSuccess(newData, text) {
    return {
        type: SEARCHING_RESTAURANT_SUCCESS,
        newData,
        text,
    }
}

export function displayRestaurantFailure(text) {
    return {
        type: NO_MATCHED_RESTAURANT,
        text,
    }
}