import React, {Component} from 'react';
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import routerList from "../../../../config/routeMap"
import { Layout } from "antd";
const { Content } = Layout;

class LayoutContent extends Component {
    state = {
        path: ""
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("66666666666666666")
        return nextProps.history.location.pathname !== this.state.path
    }

    componentDidMount() {
        const path = this.props.history.location.pathname
        this.setState({path: path})
    }

    render() {
        return (
            <Content style={{marginLeft: 260}} >
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
