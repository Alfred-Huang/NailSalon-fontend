import * as types from "../action-types"

const employeeList = {
    employeeList: [
            {employeeId: "abc1", name: "xiaoming"},
            {employeeId: "abc2", name: "xiaoli"},
            {employeeId: "abc3", name: "xiaohua"},
            {employeeId: "abc4", name: "xiaoliu"},
        ]
}


export default  function saleRecordListReducer(state = employeeList, action){
    switch (action.type) {
        default:
            return state
    }
}

