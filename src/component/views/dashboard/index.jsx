import React, {Component, Fragment} from 'react';
import {Row, Col, Card, List, Typography} from "antd";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart
} from 'recharts';
import dailyData from "../../../mock/dailySummary";
import appointmentData from "../../../mock/appointment";
import MyBarChart from "./BarChart";
import ItemList from "./ItemList";
import "./index.css"


class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 40}}>
                    <Col offset={1}>
                        <Card hoverable={true} style={{width: "calc(100vw * 0.5 - 30)"}} title={"Daily Summary"} headStyle={{height: 30, textAlign: "center"}}>
                            <div  style={{width: "calc(100vw * 0.4)", height: 350}}>
                                <MyBarChart/>
                            </div>
                        </Card>
                    </Col>
                    <Col offset={1}>
                        <Card  className="appointment-card" hoverable={true} style={{width: "calc(100vw * 0.3)", height: 446}} title={"Appointment"} headStyle={{height: 30, textAlign: "center"}}>
                            <ItemList />
                        </Card>
                    </Col>
                </Row>
                <Row  style={{marginTop: 20}}>
                    <Col offset={1}>
                        <Card  className="appointment-card" hoverable={true} style={{width: "calc(100vw * 0.5 - 30)", height: 446}} title={"Employees Summary"} headStyle={{height: 30, textAlign: "center"}}>
                            <div  style={{width: "calc(100vw * 0.4)", height: 350}}>
                                <MyBarChart/>
                            </div>
                        </Card>
                    </Col>
                    <Col offset={2}>
                        <Card  className="appointment-card" hoverable={true} style={{width: "calc(100vw * 0.2)", height: 446}} title={"Product Reminder"} headStyle={{height: 30, textAlign: "center"}}>
                            <ItemList />
                        </Card>
                    </Col>
                </Row>

                {/*<Row gutter={16} style={{marginTop: 30}}>*/}
                {/*    /!*Daily Summary*!/*/}
                {/*    <Col offset={1}>*/}
                {/*        <Card hoverable={true} bodyStyle={{height: 330}} title={"Daily Summary"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            {dailySummary}*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    /!*appointment*!/*/}
                {/*    <Col>*/}
                {/*        <Card className="appointment-card" hoverable={true}  title={"Appointment"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            <List*/}
                {/*                dataSource={appointmentData}*/}
                {/*                renderItem={item => (*/}
                {/*                    <List.Item>*/}
                {/*                      {item}*/}
                {/*                    </List.Item>*/}
                {/*                )}*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    /!*product notification*!/*/}
                {/*    <Col>*/}
                {/*        <Card className="product-card" hoverable={true}  title={"Product Reminder"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            <List*/}
                {/*                dataSource={appointmentData}*/}
                {/*                renderItem={item => (*/}
                {/*                    <List.Item>*/}
                {/*                        {item}*/}
                {/*                    </List.Item>*/}
                {/*                )}*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<Row gutter={16} style={{marginTop: 40}}>*/}
                {/*    /!*employee*!/*/}
                {/*    <Col offset={1}>*/}
                {/*        <Card hoverable={true} bodyStyle={{height: 330}} title={"Day of Year Summary"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            {dailySummary}*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        <Card hoverable={true} bodyStyle={{height: 330}} title={"Service Summary"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            {dailySummary}*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        <Card className="employee-card" hoverable={true}  title={"Employee Schedule"} headStyle={{height: 30, textAlign: "center"}}>*/}
                {/*            <List*/}
                {/*                dataSource={appointmentData}*/}
                {/*                renderItem={item => (*/}
                {/*                    <List.Item>*/}
                {/*                        {item}*/}
                {/*                    </List.Item>*/}
                {/*                )}*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Fragment>
        );
    }
}

export default Dashboard;
