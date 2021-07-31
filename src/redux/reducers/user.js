import * as types from "../action-types"
import {getToken} from "../../utils/auth";


const userInfo = {
    token: getToken()
}


export default function userReducer(state = userInfo, action){
    switch (action.type) {
        default:
            return state
    }
}

