import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon } from "antd";
import menuList from "../../../../../config/menuConfig"
import {getMenuItemInMenuListByProperty} from "../../../../../utils";
import "./index.css"
const SubMenu = Menu.SubMenu;

class MenuList extends Component {
    state = {
        menuTreeNode: null,
        openKey: [],
    }

    componentWillMount() {
        const menuTreeNode = this.getMenuNodes(menuList);
        this.setState({
            menuTreeNode
        })
        this.handleMenuSelection(this.state.openKey)
    }

    // menuItemFilter = (item)=>{
    //     const {roles} = item;
    //     const {role} = this.props
    //     //if the user has admin role, return true
    //     if(role === "admin" || !roles || roles.include(role)){
    //         return true
    //     } else if(item.children){
    //         // !! to check if item children has target role
    //         return !!item.children.find((child) => roles.include(child.role));
    //     }
    //     return false;
    // }

    getMenuNodes = (menuList)=>{
        const path = this.props.history.location.pathname
        console.log(menuList)
        return menuList.reduce((pre, item)=>{

                // if current item has children
                if(!item.children){
                    pre.push(
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                // if current item has children we keep track the children to find the
                // target item
                }else{
                    const cItem = item.children.find(
                        (cItem) => path.indexOf(cItem.path) === 0
                    );
                    // if the target path exist, we open the submenu
                    if (cItem) {
                        this.setState((state) => ({
                            openKey: [...state.openKey, item.path],
                        }));
                    }
                    // add <submenu> into pre
                    pre.push(
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                     {item.icon ? <Icon type={item.icon} /> : null}
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {/*if the cur item also has children, we also need to add*/}
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    );
                }

            return pre
        }, [])
    }

    handleMenuSelection = ({key = "/dashboard"}) =>{
      getMenuItemInMenuListByProperty(menuList, "path", key)
    }

    render() {
        const path = this.props.location.pathname;
        const openKey = this.state.openKey;
        return (
            <div>
                {this.state.menuTreeNode.map((item, index)=>(
                    <Menu
                        style={{width: 230}}
                        className="sidebar-menu-container"
                        mode="inline"
                        theme="dark"
                        key={index}
                        mode={"inline"}
                        onSelect={this.handleMenuSelection}
                        selectedKeys={[path]}
                        defaultOpenKeys={openKey}
                    >
                        {item}
                    </Menu>
                ))
                }
            </div>
        );
    }
}

export default withRouter(MenuList);
