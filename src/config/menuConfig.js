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
        title: "Sale",
        path: "/sale",
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
            },
            {
                title: "Setting",
                path: "/product/setting"
            }
        ]
    },
    {
        title: "Manage",
        path: "/manage",
    },
    {
        title: "Setting",
        path: "/setting"
    }
];
export default menuList;
