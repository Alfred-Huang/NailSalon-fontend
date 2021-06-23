import React, {Component, Fragment} from 'react';
import {Card} from "antd";
import MyComposedChart from "../charts/ComposedChart/MyComposedChart";

class FinancialAnalytics extends Component {
    render() {
        return (
            <Fragment>
                <Card
                    hoverable={true}
                    style={{width: "calc(100vw * 0.7)", marginTop: 5}}
                    title={"Service Summary"}
                    headStyle={{height: 30}}
                    extra={<a href="#">More</a>}
                >
                    <div  style={{width: "calc(100vw * 0.5 - 650)", height: 400}}>
                        <MyComposedChart />
                    </div>
                </Card>
            </Fragment>
        );
    }
}

export default FinancialAnalytics;
