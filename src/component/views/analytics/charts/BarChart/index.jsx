import React, {Component, Fragment} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import data from "../../../../../mock/dailySummary";

class MyBarChart extends Component {

    componentDidMount() {
    }

    barChartDisplay = () =>{
        return <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
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
