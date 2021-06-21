const menuList = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: "home",

    },
    {
        title: "Appointment",
        path: "/appointment",
        icon: "home"
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: "dd"
    },
    {
        title: "Product",
        path: "/product",
        icon: "home",
        children: [
            {
                title: "Products",
                path: "/product/products"
            }
        ],
    },
    {
        title: "Summary",
        path: "/summary",
        icon: "home",
    },
    {
        title: "Record",
        path: "/record",
        children: [
            {
                title: "Payment",
                path: "/record/payment"
            },
            {
                title: "Setting",
                path: "/record/setting"
            }
        ]
    },
    {
        title: "Manage",
        path: "/manage"
    }

];
export default menuList;
