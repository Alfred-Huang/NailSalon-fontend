import React, {Component, Fragment} from 'react';
import {Card, Col, DatePicker, message, Row, Select} from "antd";
import EmployeeBarChart from "./EmployeeBarChart";
import moment from "moment";
import server from "../../../../config/config";
import axios from "axios";


class EmployeeAnalytics extends Component {

    state ={
        monthDate: "",
        employeeDataSource: [],
    }
    componentDidMount() {
        const curMonth = moment().format("YYYY-MM")
        const nextMonth = moment(curMonth).add(1, "months").format("YYYY-MM")
        this.setState({monthDate: curMonth})
        this.getEmployeeSummary(curMonth, nextMonth)
    }

    getEmployeeSummary = (curMonth, nextMonth)=>{
        let api = server.IP + "/analytics/getEmployeeSummary"
        const date = {curMonth: curMonth, nextMonth: nextMonth}
        axios.post(api, date).then((result)=>{
            this.setState({employeeDataSource: result.data, monthDate: curMonth})
        }).catch(()=>{
            this.error()
        })
    }

    monthChange = (date, dateString) =>{
        console.log(dateString)
        let nextMonth =  moment(dateString).add(1, "months").format("YYYY-MM");
        this.setState({monthDate: dateString})
        this.getEmployeeSummary(dateString, nextMonth)
    }
    error = () => {
        message.error('Fail to load data');
    };

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 100}}>
                    <Col>
                        <DatePicker value={moment(this.state.monthDate, "YYYY-MM")} onChange={this.monthChange} picker="month"/>
                    </Col>
                </Row>
                <Col>
                    <Card
                        hoverable={true}
                        style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                        title={"Employees Summary"}
                        headStyle={{height: 30, textAlign: "center"}}
                    >
                        <div  style={{width: "calc(100vw * 0.3 - 40)", height: 350}}>
                            <EmployeeBarChart employeeDataSource={this.state.employeeDataSource}/>
                        </div>
                    </Card>
                </Col>
            </Fragment>
        );
    }
}

export default EmployeeAnalytics;
