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
import dailyData from "../../../../mock/dailySummary";


class MyBarChart extends Component {

    state = {

    }

    componentDidMount() {
        window.addEventListener("resize", this.resize)

    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }

    resize = ()=>{
        let newWidth, newHeight
        const screenWidth = document.documentElement.clientWidth
    }

    barChartDisplay = () =>{
       return <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={ 500}
                    height={ 350}
                    data={dailyData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
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
