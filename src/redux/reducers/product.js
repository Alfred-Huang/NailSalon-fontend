import * as types from "../action-types"

const productList = {
    list: []
}


export default function productListReducer(state = productList, action){
    switch (action.type) {
        case types.SET_PRODUCT:
            return action.initProduct
        case types.ADD_PRODUCT:
            let newProduct = JSON.parse(JSON.stringify(state))
            newProduct.list =  newProduct.list.concat(action.newEmployee)
            return newProduct
        case types.DELETE_PRODUCT:
            let newProductListForDelete = JSON.parse(JSON.stringify(state))
            let result = {list: []}
            result.list = newProductListForDelete.list.filter(item =>{
                return item.productId !== action.targetProduct
            })
            return result
        case types.UPDATE_PRODUCT:
            let newProductListForUPDATE= JSON.parse(JSON.stringify(state))
            newProductListForUPDATE.list[action.targetIndex] = action.newProduct;
            return newProductListForUPDATE
        case types.SEARCH_NUMBER:
            let newProductListForSearchNumber = JSON.parse(JSON.stringify(state))
            let SearchNumberResult = {list: []}
            SearchNumberResult.list = newProductListForSearchNumber.list.filter(item =>{
                return item.number === action.targetNumber
            })
            return SearchNumberResult
        case types.SEARCH_TYPE:
            let newProductListForSearchTYPE = JSON.parse(JSON.stringify(state))
            let SearchTypeResult = {list: []}
            SearchTypeResult.list = newProductListForSearchTYPE.list.filter(item =>{
                return item.type === action.targetType
            })
            return SearchTypeResult
        default:
            return state
    }
}

