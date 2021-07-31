import Loadable from "react-loadable"
import Loading from "../component/loading";
const Dashboard = Loadable({loader: () => import('../component/views/dashboard'), loading: Loading});
const Products = Loadable({loader: () => import('../component/views/product/products'), loading: Loading});
const Manage = Loadable({loader: () => import('../component/views/manage'), loading: Loading})
const Appointment = Loadable({loader: () => import('../component/views/appointment'), loading: Loading})
const Analytics = Loadable({loader: () => import('../component/views/analytics'), loading: Loading})
const Sale = Loadable({loader: () => import('../component/views/sale'), loading: Loading})
const Setting = Loadable({loader: () => import('../component/views/setting'), loading: Loading})
// import Dashboard from "../component/views/dashboard";
// import Products from "../component/views/product/products"
// import Manage from "../component/views/manage";
// import Appointment from "../component/views/appointment";
// import Analytics from "../component/views/analytics";
// import Sale from "../component/views/sale";
// import Setting from "../component/views/setting";
// import ProductSetting from "../component/views/product/setting";

// eslint-disable-next-line import/no-anonymous-default-export
export default  [
    {path: "/dashboard", component: Dashboard, roles: ["admin"]},
    {path: "/appointment", component: Appointment, roles: ["admin"]},
    {path: "/analytics", component: Analytics, roles: ["admin"]},
    {path: "/product", component: Products, roles: ["admin"]},
    {path: "/setting", component: Setting, roles: ["admin"]},
    {path: "/sale", component: Sale, roles: ["admin"]},
    {path: "/manage", component: Manage, roles: ["admin"]}
];


