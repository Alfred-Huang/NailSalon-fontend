import * as types from "../action-types"

const employeeList = {
    list: [
            {employeeId: "abc1", name: "xiaoming"},
            {employeeId: "abc2", name: "xiaoli"},
            {employeeId: "abc3", name: "xiaohua"},
            {employeeId: "abc4", name: "xiaoliu"},
        ]
}


export default function employeeListReducer(state = employeeList, action){
    switch (action.type) {


        default:
            return state
    }
}

