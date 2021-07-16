import * as types from "../action-types"

const serviceList = {
    list: []
}


export default function serviceListReducer(state = serviceList, action){
    switch (action.type) {
        case types.ADD_SERVICE:
            let newServiceListForAdding = JSON.parse(JSON.stringify(state))
            newServiceListForAdding.list.push(action.newService)
            return newServiceListForAdding
        case types.SET_SERVICE:
            return action.initService
        case types.UPDATE_SERVICE:
            let stateForUpdate = JSON.parse(JSON.stringify(state));
            stateForUpdate.list.forEach(function(item){
                if(item.service_id === action.updatedService.serviceId){
                    item.service = action.updatedService.service
                    item.price = action.updatedService.price
                }
            })
            return stateForUpdate
        case types.DELETE_SERVICE:
            let stateForDelete = JSON.parse(JSON.stringify(state));
            let r = {list: []}
            r.list = stateForDelete.list.filter((item) => {
                return item.service_id !== action.targetService
            })
            console.log(r)
            return r
        default:
            return state
    }
}

