import * as types from "../action-types"

const initSaleRecordList = {
    record: {}
}


export default  function saleRecordListReducer(state = initSaleRecordList, action){
    switch (action.type) {
        case types.ADD_SALE_RECORD:
            let newState = JSON.parse(JSON.stringify(state))
            newState.record[action.id] = action.saleRecord
            return newState
        default:
            return state
    }
}


