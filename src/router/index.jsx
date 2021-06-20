import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Layout from "../component/views/layout/index";
import Login from "../component/login";


class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route
                        path="/"
                        component={Layout}
                   />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
