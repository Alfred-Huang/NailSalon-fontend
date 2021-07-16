import { combineReducers } from "redux";
import sale from "./sale";
import employee from "./employee"
import service from "./service";

export default combineReducers({
    sale,employee,service
});
