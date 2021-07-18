import * as types from "../action-types"

const scheduleList = {
    list: []
}


export default function scheduleListReducer(state = scheduleList, action){
    switch (action.type) {
        case types.ADD_SCHEDULE:
            let newListForAdd = JSON.parse(JSON.stringify(state))
            newListForAdd.list = newListForAdd.list.concat(action.newSchedule)
            return newListForAdd
        case types.SET_SCHEDULE:
            return action.initSchedule
        case types.DELETE_SCHEDULE:
            return {list: [...action.newSchedule]}
        default:
            return state
    }
}

