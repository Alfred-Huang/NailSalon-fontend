import React, {Component, Fragment} from 'react';
import {Row, Col, Card, List, Table} from "antd";
import appointmentData from "../../../../mock/appointment";
import server from "../../../../config/config";
import moment from "moment";
import axios from "axios";
class ItemListForAppointment extends Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        let api = server.IP + "/dashboard/getAppointment";
        let date = moment().format("YYYY-MM-DD")
        axios.post(api, {date}).then((result)=>{
            if(result.data.length > 0){
                let newData = result.data.map((item)=>({key: item.appointment_id, customer: item.customer, employee: item.employee, service: item.service, people: item.people, time: item.time}))
                this.setState({dataSource: newData})
            }
        }).catch(()=>{
            this.error()
        })
    }

    render() {

        const columns = [
            {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
            },
            {
                title: 'Employees',
                dataIndex: 'employee',
                key: 'employee',
            },
            {
                title: 'Services',
                dataIndex: 'service',
                key: 'service',
            },
            {
                title: 'People',
                key: 'people',
                dataIndex: 'people',
            },
            {
                title: 'Time',
                key: 'time',
                dataIndex: 'time',
            }
        ];
        return (
            <Fragment>
                <Table columns={columns} scroll={{ y: 300 }} pagination={false} dataSource={this.state.dataSource}/>
            </Fragment>
        );
    }
}

export default ItemListForAppointment;
