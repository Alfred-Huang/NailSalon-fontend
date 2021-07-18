import { combineReducers } from "redux";
import sale from "./sale";
import employee from "./employee"
import service from "./service";
import schedule from "./schedule";

export default combineReducers({
    sale,employee,service,schedule
});
