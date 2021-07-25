import React, {Component, Fragment} from 'react';
import {Card, Col, DatePicker, message, Row} from "antd";
import MyPieChart from "../charts/PieChart";
import ServiceVerticalChart from "./ServiceVerticalChart";
import EmployeeAnalytics from "../empolyee";
import MyBarChart from "../charts/BarChart";
import moment from "moment";
import server from "../../../../config/config";
import axios from "axios";

class MarketAnalytics extends Component {
    state ={
        serviceMonthDate: "",
        serviceDate: "",
        productDate: "",
        productMonthDate: "",
        serviceDataSource: [],
        productDataSource: [],
    }
    componentDidMount() {
        const curMonth = moment().format("YYYY-MM")
        const nextMonth = moment(curMonth).add(1, "months").format("YYYY-MM")
        this.setState({serviceDate: curMonth, productDate: curMonth})
        this.getServiceSummary(curMonth, nextMonth)
        this.getProductSummary(curMonth. nextMonth)
    }

    getServiceSummary = (curMonth, nextMonth)=>{
        let api = server.IP + "/analytics/getServiceSummary"
        const date = {curMonth: curMonth, nextMonth: nextMonth}
        axios.post(api, date).then((result)=>{
            this.setState({serviceDataSource: result.data, serviceDate: curMonth})
        }).catch(()=>{
            this.error()
        })
    }

    getProductSummary = (curMonth, nextMonth) =>{
        let api = server.IP + "/analytics/getServiceSummary"
        const date = {curMonth: curMonth, nextMonth: nextMonth}
        axios.post(api, date).then((result)=>{
            this.setState({productDataSource: result.data, productDate: curMonth})
        }).catch(()=>{
            this.error()
        })
    }
    error = () => {
        message.error('Fail to load data');
    };
    serviceDateChange = (date, dateString) =>{
        const nextMonth = moment(dateString).add(1, "months").format("YYYY-MM")
        this.getServiceSummary(dateString, nextMonth)
    }

    productDateChange = (date, dateString) =>{
        const nextMonth = moment(dateString).add(1, "months").format("YYYY-MM")
        this.getProductSummary(dateString, nextMonth)
    }

    render() {
        return (
            <Fragment>
                <Col>
                    {/*<Row style={{marginTop: 10}}>*/}
                    {/*    <Col>*/}
                    {/*        <DatePicker value={moment(this.state.productDate, "YYYY-MM")} onChange={this.productDateChange} picker="month"/>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Card*/}
                    {/*    hoverable={true}*/}
                    {/*    style={{width: "calc(100vw * 0.3)", marginTop: 5}}*/}
                    {/*    title={"Product Summary"}*/}
                    {/*    headStyle={{height: 30}}*/}
                    {/*>*/}
                    {/*    <div  style={{width: "calc(100vw * 0.4 - 60)", height: 300}}>*/}
                    {/*        <MyPieChart />*/}
                    {/*    </div>*/}
                    {/*</Card>*/}
                        <EmployeeAnalytics />
                </Col>

                <Col offset={1}>
                    <Row style={{marginTop: 100}}>
                        <Col>
                            <DatePicker value={moment(this.state.serviceDate, "YYYY-MM")} onChange={this.serviceDateChange} picker="month"/>
                        </Col>
                    </Row>
                    <Card
                        hoverable={true}
                        style={{width: "calc(100vw * 0.4 - 65px)", marginTop: 5}}
                        title={"Service Summary"}
                        headStyle={{height: 30}}
                    >
                        <div  style={{width: "calc(100vw * 0.5 - 650)", height: 500}}>
                            <ServiceVerticalChart serviceDataSource={this.state.serviceDataSource}/>
                        </div>
                    </Card>
                </Col>
            </Fragment>
        );
    }
}

export default MarketAnalytics;
