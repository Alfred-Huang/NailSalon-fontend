import React, {Component, Fragment} from 'react';
import { Layout, Menu } from 'antd';
import Content from "./content";
import LayoutSider from "./sider";
class MainPage extends Component {
    render() {
        return (
                <Layout style={{minHeight: "100vh"}}>
                    <LayoutSider/>
                    <Layout>
                        <Content/>
                    </Layout>
                </Layout>
        );
    }
}

export default MainPage;
