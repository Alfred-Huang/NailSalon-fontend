import React, {Component, Fragment} from 'react';
import {Row} from "antd";
import PieChart from "./PieChart";
class Summary extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <div  style={{width: "calc(100vw * 0.2)", height: 350}}>
                        <PieChart />
                    </div>
                </Row>
            </Fragment>
        );
    }
}

export default Summary;
