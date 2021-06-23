import Dashboard from "../component/views/dashboard";
import Products from "../component/views/product/products"
import Manage from "../component/views/manage";
import Appointment from "../component/views/appointment";
import Analytics from "../component/views/analytics";
import Sale from "../component/views/sale";
import Setting from "../component/views/setting";
import ProductSetting from "../component/views/product/setting";

export default  [
    {path: "/dashboard", component: Dashboard, roles: ["admin"]},
    {path: "/appointment", component: Appointment, roles: ["admin"]},
    {path: "/analytics", component: Analytics, roles: ["admin"]},
    {path: "/product/products", component: Products, roles: ["admin"]},
    {path: "/product/setting", component: ProductSetting, roles: ["admin"]},
    {path: "/setting", component: Setting, roles: ["admin"]},
    {path: "/sale", component: Sale, roles: ["admin"]},
    {path: "/manage", component: Manage, roles: ["admin"]}
];


