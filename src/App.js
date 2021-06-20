import React, {Component, Fragment} from "react";
import Router from "./router/index"
import store from "./redux";
import "./App.css"
import {Provider} from "react-redux";


export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                        <Router/>
                </Fragment>
              </Provider>
        );
    }
}


