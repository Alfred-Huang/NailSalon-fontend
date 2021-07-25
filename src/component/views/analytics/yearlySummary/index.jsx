import React, {Component, Fragment} from 'react';
import {Card, Col, DatePicker, message, Row} from "antd";
import YearlyLineChart from "./YearlyLineChart";
import moment from "moment";
import server from "../../../../config/config";
import axios from "axios";

class FinancialAnalytics extends Component {
    state ={
        date: "",
        dataSource: [],
    }
    componentDidMount() {
        const curYear = moment().format("YYYY")
        const nextYear = moment(curYear).add(1, "years").format("YYYY")
        this.getYearlySummary(curYear, nextYear)
    }

    getYearlySummary = (curYear, nextYear)=>{
        let api = server.IP + "/analytics/getYearlySummary"
        const date = {curYear: curYear, nextYear: nextYear}
        axios.post(api, date).then((result)=>{
            console.log(result.data)
            this.setState({dataSource: result.data, date: curYear})
        }).catch(()=>{
            this.error()
        })
    }

    dateChange = (date, dateString) =>{
        let nextYear =  moment(dateString).add(1, "years").format("YYYY");
        this.getYearlySummary(dateString, nextYear)
    }
    error = () => {
        message.error('Fail to load data');
    };
    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 10}}>
                    <Col>
                        <DatePicker value={moment(this.state.date, "YYYY")} onChange={this.dateChange} picker="year"/>
                    </Col>
                </Row>
                <Card
                    hoverable={true}
                    style={{width: "calc(100vw * 0.7)", marginTop: 5}}
                    title={"Yearly Summary"}
                    headStyle={{height: 30}}
                >
                    <div  style={{width: "calc(100vw * 0.5 - 650)", height: 400}}>
                        <YearlyLineChart dataSource={this.state.dataSource} />
                    </div>
                </Card>
            </Fragment>
        );
    }
}

export default FinancialAnalytics;
