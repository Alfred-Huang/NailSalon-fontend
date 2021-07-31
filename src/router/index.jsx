import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Layout from "../component/views/layout/index";
import Login from "../component/login";
import {connect} from "react-redux";
import {addSaleRecord, setEmployee, setSaleRecord, setService} from "../redux/action";
import {getToken} from "../utils/auth";

class Router extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route
                        path="/"
                        render={() => {
                            if (!getToken()) {
                                return <Redirect to="/login" />;
                            } else {
                                return <Layout />
                            }
                        }}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default  connect(
    state =>({userInfo: state.user}),

)(Router);
