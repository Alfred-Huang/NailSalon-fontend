import React, {Component, Fragment} from 'react';
import EarningAnalytics from "./earning";
import MarketAnalytics from "./market"
import EmployeeAnalytics from "./empolyee";
import FinancialAnalytics from "./yearlySummary";
import {Col, Row} from "antd";


class Analytics extends Component {

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 50, marginLeft: 130}}>
                        <EarningAnalytics />
                </Row>
                <Row style={{marginTop: 50, marginLeft: 130}}>
                    <MarketAnalytics />
                </Row>
                <Row style={{marginTop: 50, marginLeft: 130}}>
                    <Col>
                        <FinancialAnalytics />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Analytics;
