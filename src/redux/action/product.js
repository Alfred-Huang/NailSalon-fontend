import * as types from "../action-types";

export const addProduct = newProduct => ({type: types.ADD_PRODUCT, newProduct})
export const setProduct = initProduct => ({type: types.SET_PRODUCT, initProduct})
export const deleteProduct = targetProduct =>({type: types.DELETE_PRODUCT, targetProduct})
export const updateProduct = targetProduct =>({type: types.UPDATE_PRODUCT, targetProduct})
export const searchNumber = targetNumber =>({type: types.SEARCH_NUMBER, targetNumber})
export const searchType = targetType =>({type: types.SEARCH_TYPE, targetType})
