import React, {Component, Fragment} from 'react';
import {Card, Col, DatePicker, Row, Select} from "antd";
import MyBarChart from "../charts/BarChart";


const { Option } = Select;
function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
class EmployeeAnalytics extends Component {
    render() {
        return (
            <Fragment>
                <Col>
                    <Card
                        hoverable={true}
                        style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                        title={"Employees Summary"}
                        headStyle={{height: 30, textAlign: "center"}}
                    >
                        <div  style={{width: "calc(100vw * 0.3 - 40)", height: 350}}>
                            <MyBarChart/>
                        </div>
                    </Card>
                </Col>
            </Fragment>
        );
    }
}

export default EmployeeAnalytics;
