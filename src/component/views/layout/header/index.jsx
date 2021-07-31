import React, {Component, Fragment} from 'react';
import {Layout,Button} from "antd";
const { Header } = Layout;
class header extends Component {
    render() {
        return (
            <Fragment>
8               <Header >
                    <Button type="link" style={{color: "white"}}>Log out</Button>
               </Header>
            </Fragment>
        );
    }
}

export default header;
