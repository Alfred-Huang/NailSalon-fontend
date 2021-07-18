import * as types from "../action-types"

const employeeList = {
    list: []
}


export default function employeeListReducer(state = employeeList, action){
    switch (action.type) {
        case types.SET_EMPLOYEE:
            return action.initEmployeeList
        case types.ADD_EMPLOYEE:
            let newEmployee = JSON.parse(JSON.stringify(state))
            newEmployee.list =  newEmployee.list.concat(action.newEmployee)
            return newEmployee
        case types.DELETE_EMPLOYEE:
            let newEmployeeListForDelete = JSON.parse(JSON.stringify(state))
            let result = {list: []}
            result.list = newEmployeeListForDelete.list.filter(item =>{
                return item.employee_id !== action.targetEmployee
            })
            return result
        default:
            return state
    }
}

