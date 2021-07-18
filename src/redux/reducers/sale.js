import * as types from "../action-types"

const initSaleRecordList = {
    record: []
}


export default  function saleRecordList(state = initSaleRecordList, action){
    switch (action.type) {
        case types.ADD_SALE_RECORD:
            let newState = JSON.parse(JSON.stringify(state))
            newState.record.unshift(action.saleRecord)
            return newState
        case types.SET_SALE_RECORD:
            return action.newSaleRecord
        default:
            return state
    }
}


