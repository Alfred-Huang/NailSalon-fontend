import React, {Component, Fragment} from 'react';
import {Card, Row, DatePicker, Col, Space, Select, Button} from "antd";
import MyBarChart from "../BarChart";


const { Option } = Select;
function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
class FinanceSummary extends Component {


    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 10}}>
                    <Col offset={1}>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </Col>
                    <Col offset={19}>
                        <Button  type="primary">Compare</Button>
                    </Col>
                </Row>
                <Row justify={"center"} style={{marginTop: 20}}>
                    <Col>
                        <Card
                            hoverable={true}
                            style={{width: "calc(100vw - 340px)"}}
                            title={"Monthly Summary"}
                            headStyle={{height: 30, textAlign: "center"}}
                            extra={
                                <Select style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="Jan">Jan</Option>
                                    <Option value="Feb">Feb</Option>
                                    <Option value="Mar">Mar</Option>
                                    <Option value="Jun">Jun</Option>
                                    <Option value="Jul">Jul</Option>
                                    <Option value="Aug">Aug</Option>
                                    <Option value="Sep">Sep</Option>
                                    <Option value="Oct">Oct</Option>
                                    <Option value="Nov">Nov</Option>
                                    <Option value="Dec">Dec</Option>
                                </Select>
                            }
                        >
                            <div  style={{width: "calc(100vw - 400px)", height: 350}}>
                                <MyBarChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row justify={"center"} style={{marginTop: 20}}>
                    <Col>
                        <Card
                            hoverable={true}
                            style={{width: "calc(100vw - 340px)"}}
                            title={"Daily Summary"}
                            headStyle={{height: 30, textAlign: "center"}}
                            extra={ <DatePicker onChange={onChange} />}
                        >
                            <div  style={{width: "calc(100vw - 400px)", height: 350}}>
                                <MyBarChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </Fragment>
        );
    }
}

export default FinanceSummary;
