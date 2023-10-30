import {
FILTER,
CLEAR_SEARCH,
} from "./action-types"

import axios from "axios";


export const combinedFilter = (filterType, value) => {
    return {type: FILTER, payload: {filterType, value}}
}

export const clearSearch = () => {
    return {type: CLEAR_SEARCH}
}


