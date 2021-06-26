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
    BarChart,
    ResponsiveContainer
} from 'recharts';
import data from "../../../../mock/dailySummary";


class MyBarChart extends Component {

    state = {

    }

    componentDidMount() {
        window.addEventListener("resize", this.resize)

    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }

    barChartDisplay = () =>{
       return <ResponsiveContainer width="100%" height="100%">
           <LineChart
               width={500}
               height={300}
               data={data}
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
               <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
               {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
           </LineChart>
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

export default MyBarChart;
