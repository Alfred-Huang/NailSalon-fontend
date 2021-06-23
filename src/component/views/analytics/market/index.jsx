import React, {Component, Fragment} from 'react';
import {Card, Col} from "antd";
import MyPieChart from "../charts/PieChart";
import MyVerticalBarChart from "../charts/BarChart/VerticalBarChart";
import EmployeeAnalytics from "../empolyee";
import MyBarChart from "../charts/BarChart";

class MarketAnalytics extends Component {
    render() {
        return (
            <Fragment>
                <Col>
                    <Card
                        hoverable={true}
                        style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                        title={"Product Summary"}
                        headStyle={{height: 30}}
                        extra={<a href="#">More</a>}
                    >
                        <div  style={{width: "calc(100vw * 0.4 - 60)", height: 300}}>
                            <MyPieChart />
                        </div>
                    </Card>
                    <EmployeeAnalytics />
                </Col>

                <Col offset={1}>
                    <Card
                        hoverable={true}
                        style={{width: "calc(100vw * 0.4 - 65px)", marginTop: 100}}
                        title={"Service Summary"}
                        headStyle={{height: 30}}
                        extra={<a href="#">More</a>}
                    >
                        <div  style={{width: "calc(100vw * 0.5 - 650)", height: 500}}>
                            <MyVerticalBarChart />
                        </div>
                    </Card>
                </Col>
            </Fragment>
        );
    }
}

export default MarketAnalytics;
