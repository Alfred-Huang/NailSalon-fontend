import React, {Component, Fragment} from 'react';
import {Button, Card, Col, DatePicker, Row, Select, Input,Divider} from "antd";
import MyBarChart from "../charts/BarChart";


const { Option } = Select;
function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
class EarningAnalytics extends Component {
    render() {
        return (
            <Fragment>
                    <Col>
                        <Row>
                            <Col>
                                <DatePicker onChange={onChange} picker="month" />
                            </Col>
                            <p style={{marginTop: 5, marginLeft: 13, fontWeight: 500, color: "#002233" }}>Compare to</p>
                            <Col offset={1}>
                                <DatePicker onChange={onChange} picker="month" />
                            </Col>
                        </Row>
                        <Card
                            hoverable={true}
                            style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                            title={"Monthly Summary"}
                            headStyle={{height: 30, textAlign: "center"}}
                        >
                            <div  style={{width: "calc(100vw * 0.3 - 40)", height: 350}}>
                                <MyBarChart/>
                            </div>
                        </Card>
                    </Col>
                    <Col offset={3}>
                        <Row>
                            <Col>
                                <DatePicker onChange={onChange}/>
                            </Col>
                            <p style={{marginTop: 5, marginLeft: 13, fontWeight: 500, color: "#002233" }}>Compare to</p>
                            <Col offset={1}>
                                <DatePicker onChange={onChange} />
                            </Col>
                        </Row>
                        <Card
                            hoverable={true}
                            style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                            title={"Daily Summary"}
                            headStyle={{height: 30, textAlign: "center"}}
                            // extra={ <DatePicker onChange={onChange} />}
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

export default EarningAnalytics;
