import * as types from "../action-types"

const initUserInfo = {
    token: "ddddddd",
    role: ""
}

export default function user(state = initUserInfo, action){
    switch (action.type) {
        case types.USER_TOKEN:
            return{
                ...state,
                token: action.token
            };
        default:
            return state
    }
}


