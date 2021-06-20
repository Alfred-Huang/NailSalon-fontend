import React, {Component} from 'react';
import {Layout} from "antd";
import MenuList from "./menu";
import "./index.css"

const {Sider} = Layout
class LayoutSider extends Component {
    render() {
        return (
            <Sider className="side-board"  width={230} style={{  height: '100vh', left: 0,  overflow: 'auto' }} >
                <MenuList />
            </Sider>
        );
    }
}

export default LayoutSider;
