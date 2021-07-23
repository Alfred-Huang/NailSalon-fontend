import React, {Component, Fragment} from 'react';
import {Row, Col, Card, List, Typography, message} from "antd";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import data from "../../../../mock/dailySummary";
import server from "../../../../config/config";
import axios from "axios";


class BarChartForEmployee extends Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize)
        let api = server.IP + "/dashboard/getEmployeeSale";
        let date = moment().format("YYYY-MM-DD")
        axios.post(api, {date}).then((result)=>{
            this.setState({dataSource: result.data})
        }).catch(()=>{
            this.error()
        })
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }

    error = () => {
        message.error('Fail to load data');
    }

    barChartDisplay = () =>{
       return <ResponsiveContainer width="100%" height="100%">
           <BarChart
               width={500}
               height={300}
               data={this.state.dataSource}
               margin={{
                   top: 5,
                   right: 30,
                   left: 20,
                   bottom: 5,
               }}
           >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="employee" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="sale" fill="#8884d8" />
               {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
           </BarChart >
        </ResponsiveContainer>
    }

    render() {
        return (
            <Fragment>
                {this.barChartDisplay()}
            </Fragment>
        );
    }
}

export default BarChartForEmployee;
