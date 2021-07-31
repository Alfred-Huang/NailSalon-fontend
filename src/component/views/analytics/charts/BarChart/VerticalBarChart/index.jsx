// import React, {Component, Fragment} from 'react';
// import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
// import dailyData from "../../../../../../mock/dailySummary"
// class MyVerticalBarChart extends Component {
//     barChartDisplay = () =>{
//         return <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//                 width={ 350}
//                 height={ 500}
//                 data={dailyData}
//                 margin={{
//                     top: 5,
//                     right: 30,
//                     left: 0,
//                     bottom: 5,
//                 }}
//                 layout="vertical"
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number"/>
//                 <YAxis type="category" dataKey="name" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="pv" fill="#8884d8" />
//             </BarChart>
//         </ResponsiveContainer>
//     }
//
//     render() {
//         return (
//             <Fragment>
//                 {this.barChartDisplay()}
//             </Fragment>
//         );
//     }
// }
//
// export default MyVerticalBarChart;
