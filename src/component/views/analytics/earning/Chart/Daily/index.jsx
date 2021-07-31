import React, {Component, Fragment} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart} from "recharts";

class DailyLineChart extends Component {

    barChartDisplay = () =>{
        let data = this.props.dailyDataSource.map((item)=>({hour: item.hour, sale: parseInt(item.sale)}))
        return <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={ 500}
                height={ 350}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 1" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="sale" fill="#8884d8" />
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

export default DailyLineChart;
