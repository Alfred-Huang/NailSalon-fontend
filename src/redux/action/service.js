import * as types from "../action-types";


export const addService = newService => ({type: types.ADD_SERVICE, newService})
export const setService = initService => ({type: types.SET_SERVICE, initService})
export const updateService = updatedService =>({type: types.UPDATE_SERVICE, updatedService})
export const deleteService = targetService =>({type: types.DELETE_SERVICE, targetService})
