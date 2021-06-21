import Dashboard from "../component/views/dashboard";
import Products from "../component/views/product/products/index"
import Summary from "../component/views/summary";
import Payment from "../component/views/record/payment";
import Setting from "../component/views/record/setting";
import Manage from "../component/views/manage";
import Appointment from "../component/views/appointment";
import Analytics from "../component/views/analytics";

export default  [
    {path: "/dashboard", component: Dashboard, roles: ["admin"]},
    {path: "/appointment", component: Appointment, roles: ["admin"]},
    {path: "/analytics", component: Analytics, roles: ["admin"]},
    {path: "/product/products", component: Products, roles: ["admin"]},
    {path: "/summary", component: Summary, roles: ["admin"]},
    {path: "/record/payment", component: Payment, roles: ["admin"]},
    {path: "/record/setting", component: Setting, roles: ["admin"]},
    {path: "/manage", component: Manage, roles: ["admin"]}
];


