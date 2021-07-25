import React, {Component, Fragment} from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


class ServiceVerticalChart extends Component {

    render() {
        let data = this.props.serviceDataSource.map((item)=>({service: item.service, count: parseInt(item.count)}))
        console.log(data)
        return (
            <Fragment>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 80,
                            bottom: 20,
                            left: 20,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number"  />
                        <YAxis type="category" dataKey="service" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" barSize={10} fill="#413ea0" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Fragment>
        );
    }
}

export default ServiceVerticalChart;
