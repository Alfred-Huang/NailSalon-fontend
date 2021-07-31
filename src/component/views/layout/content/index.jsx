import React, {Component, Fragment} from 'react';
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import routerList from "../../../../config/routeMap"
import {Button, Form, Input, InputNumber, Layout, Modal, Select, Table} from "antd";
import {removeToken} from "../../../../utils/auth";

const { Content } = Layout;

class LayoutContent extends Component {
    state = {
        path: "",
        isModalVisible: false
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.history.location.pathname !== this.state.path
    }

    handleClick = ()=>{
        removeToken()
        this.props.history.push('/');
    }


    componentDidMount() {
        const path = this.props.history.location.pathname
        this.setState({path: path})
    }

    render() {
        return (
            <Content style={{marginLeft: 230}} >
                <div style={{backgroundColor: "#111d2c"}}>
                    <Button type="link" style={{marginLeft: 30, color: "white"}} onClick={this.handleClick}>Log Out</Button>
                </div>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                        {routerList.map((route)=>{
                            return(
                                <Route
                                    component={route.component}
                                    key={route.path}
                                    path={route.path}
                                />
                            )
                        })}
                </Switch>
            </Content>
        );
    }
}

export default withRouter(LayoutContent);
