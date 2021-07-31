import { combineReducers } from "redux";
import sale from "./sale";
import employee from "./employee"
import service from "./service";
import schedule from "./schedule";
import product from "./product"
import user from "./user"

export default combineReducers({
    sale,employee,service,schedule,product,user
});
