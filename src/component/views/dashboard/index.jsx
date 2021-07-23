import React, {Component, Fragment} from 'react';
import {Row, Col, Card} from "antd";
import BarChartForEmployee from "./BarChartForEmployee";
import LineChartForSummary from "./LineChartForSummary";
import ItemListForAppointment from "./ItemListForAppointment";
import ItemListForProduct from "./ItemListForProduct";
import "./index.css"


class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 50}}>
                    <Col offset={1}>
                        <Card hoverable={true} style={{width: "calc(100vw * 0.5 - 30)"}} title={"Daily Summary"} headStyle={{height: 30, textAlign: "center"}}>
                            <div  style={{width: "calc(100vw * 0.4)", height: 350}}>
                                <LineChartForSummary/>
                            </div>
                        </Card>
                    </Col>
                    <Col offset={1}>
                        <Card hoverable={true} style={{width: "calc(100vw * 0.3)", height: 446}} title={"Appointment"} headStyle={{height: 30, textAlign: "center"}}>
                            <ItemListForAppointment />
                        </Card>
                    </Col>
                </Row>
                <Row  style={{marginTop: 20}}>
                    <Col offset={1}>
                        <Card  className="appointment-card" hoverable={true} style={{width: "calc(100vw * 0.5 - 30)", height: 446}} title={"Employees Summary"} headStyle={{height: 30, textAlign: "center"}}>
                            <div  style={{width: "calc(100vw * 0.4)", height: 350}}>
                                <BarChartForEmployee/>
                            </div>
                        </Card>
                    </Col>
                    <Col offset={1}>
                        <Card  className="appointment-card" hoverable={true} style={{width: "calc(100vw * 0.3)", height: 446}} title={"Product Reminder"} headStyle={{height: 30, textAlign: "center"}}>
                            <ItemListForProduct />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Dashboard;
