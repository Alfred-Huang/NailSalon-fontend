import React, {Component, Fragment} from 'react';
import {message} from "antd";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import server from "../../../../config/config";
import moment from "moment";
import axios from "axios";


class LineChartForSummary extends Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize)
        let api = server.IP + "/dashboard/getSummary";
        let date = moment().format("YYYY-MM-DD")
        axios.post(api, {date}).then((result)=> {
            if(result.data.length > 0){
                let data = result.data.map((item)=>({sale: parseInt(item.price), time: item.time}))
                this.setState({dataSource: data})
            }
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
       return(<ResponsiveContainer width="100%" height="100%">
               <LineChart
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
                   <XAxis dataKey="time" />
                   <YAxis />
                   <Tooltip />
                   <Legend />
                   <Line type="monotone" dataKey="sale" stroke="#82ca9d" activeDot={{ r: 6 }} />
               </LineChart>
        </ResponsiveContainer>
       )
    }

    render() {
        return (
            <Fragment>
                {this.barChartDisplay()}
            </Fragment>
        );
    }
}

export default LineChartForSummary;
