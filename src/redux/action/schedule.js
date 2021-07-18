import * as types from "../action-types";

export const addSchedule = newSchedule => ({type: types.ADD_SCHEDULE, newSchedule})
export const setSchedule = initSchedule => ({type: types.SET_SCHEDULE, initSchedule})
export const deleteSchedule = newSchedule =>({type: types.DELETE_SCHEDULE, newSchedule})
