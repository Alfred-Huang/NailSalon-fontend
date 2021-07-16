import * as types from "../action-types"


export const addSaleRecord = saleRecord =>({type: types.ADD_SALE_RECORD, saleRecord})
export const setSaleRecord = newSaleRecord =>({type: types.SET_SALE_RECORD, newSaleRecord})
// export const getEmployee = employee =>({type: types.GET_EMPLOYEE, employee})
// export const addService = newService => ({type: types.ADD_SERVICE, newService})
