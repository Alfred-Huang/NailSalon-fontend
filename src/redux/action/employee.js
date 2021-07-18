import * as types from "../action-types";

export const addEmployee = newEmployee => ({type: types.ADD_EMPLOYEE, newEmployee})
export const setEmployee = initEmployeeList => ({type: types.SET_EMPLOYEE, initEmployeeList})
export const deleteEmployee = targetEmployee =>({type: types.DELETE_EMPLOYEE, targetEmployee})
