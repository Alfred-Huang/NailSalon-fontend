import React, {Component, Fragment} from 'react';
import {Button, Card, Col, DatePicker, Row, Select, Input, Divider, message} from "antd";
import MonthlyLineChart from "./Chart/Monthly";
import DailyLineChart from "./Chart/Daily";
import moment from "moment";
import server from "../../../../config/config";
import axios from "axios";


const monthDateFormat = "YYYY-MM"
const dateFormat = "YYYY-MM-DD"
class EarningAnalytics extends Component {
    state ={
        monthDate: "",
        date: "",
        monthDataSource: [],
        dailyDataSource: [],
    }
    componentDidMount() {
        const curMonth = moment().format("YYYY-MM")
        const curDate = moment().format("YYYY-MM-DD")
        const nextMonth = moment(curMonth).add(1, "months").format("YYYY-MM")
        this.setState({monthDate: curMonth, date: curDate})
        this.getMonthlySummary(curMonth, nextMonth)
        this.getDailySummary(curDate)
    }

    getMonthlySummary = (curMonth, nextMonth)=>{
        let api = server.IP + "/analytics/getMonthlySummary"
        const date = {curMonth: curMonth, nextMonth: nextMonth}
        axios.post(api, date).then((result)=>{
            this.setState({monthDataSource: result.data, monthDate: curMonth})
        }).catch(()=>{
            this.error()
        })
    }

    getDailySummary = (dateString) =>{
        let api = server.IP + "/analytics/getDailySummary"
        const date = dateString
        axios.post(api, {date}).then((result)=>{
            this.setState({dailyDataSource: result.data})
        }).catch(()=>{
            this.error()
        })
    }
    error = () => {
        message.error('Fail to load data');
    };


    monthChange = (date, dateString) =>{
        let nextMonth =  moment(dateString).add(1, "months").format("YYYY-MM");
        this.setState({monthDate: dateString})
        this.getMonthlySummary(dateString, nextMonth)
    }

    dailyChange = (date, dateString) =>{
        this.setState({date: dateString})
        console.log(dateString)
        this.getDailySummary(dateString)
    }


    render() {
        return (
            <Fragment>
                    <Col>
                        <Row>
                            <Col>
                                <DatePicker value={moment(this.state.monthDate, monthDateFormat)} format={monthDateFormat} onChange={this.monthChange} picker="month" />
                            </Col>
                        </Row>
                        <Card
                            hoverable={true}
                            style={{width: "calc(100vw * 0.3)", marginTop: 5}}
                            title={"Monthly Summary"}
                            headStyle={{height: 30, textAlign: "center"}}
                        >
                            <div  style={{width: "calc(100vw * 0.3 - 40)", height: 350}}>
                                <MonthlyLineChart monthDataSource={this.state.monthDataSource}  />
                            </div>
                        </Card>
                    </Col>
                    <Col offset={3}>
                        <Row>
                            <Col>
                                <DatePicker value={moment(this.state.date, dateFormat)} onChange={this.dailyChange}/>
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
                                <DailyLineChart dailyDataSource={this.state.dailyDataSource}/>
                            </div>
                        </Card>
                    </Col>
            </Fragment>
        );
    }
}

export default EarningAnalytics;
