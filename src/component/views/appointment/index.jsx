import React, {Component, Fragment} from 'react';
import {Space,Card, Modal, Calendar, List, Row, Col, Table, Tag} from "antd";
import moment from 'moment';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Services',
        key: 'services',
        dataIndex: 'services',
        render: services => (
            <>
                {services.map(services => {
                    let color = services.length > 5 ? 'geekblue' : 'green';
                    if (services === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={services}>
                            {services.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'People',
        dataIndex: 'people',
        key: 'people',
    },
    {
        title: 'Employees',
        key: 'employees',
        dataIndex: 'employees',
        render: employees => (
            <>
                {employees.map(employee => {
                    let color = employee.length > 5 ? 'geekblue' : 'green';
                    if (employee === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={employee}>
                            {employee.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data2 = [
    {
        key: '1',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 2,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '2',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 3,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '3',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 4,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '4',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 4,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '5',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 4,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '6',
        name: 'John Brown',
        services: ['nice', 'developer'],
        people: 4,
        employees: ['dd', 'aa'],
        time: "12:00"
    },
    {
        key: '7',
        name: 'John Brown',
        services: ['nice', 'developer', "dd", "dsad"],
        people: 4,
        employees: ['dd', 'aa'],
        time: "12:00"
    },

];


class Appointment extends Component {

    state = {
        isModalVisible: false,
    }

    handleOk = ()=>{
        this.setState({isModalVisible: false})
    }

    handleCancel = ()=>{
        this.setState({isModalVisible: false})
    }

    onSelect = (value) =>{
        const date = value.format("YYYY-MM-DD")
        this.setState({isModalVisible: true}, ()=>{

        })
    }


    render() {
        return (
            <Fragment>
                <Card style={{marginTop: 50, marginLeft: "auto", marginRight: "auto", width: "calc(100vw * 0.8)"}}>
                    <Calendar  onSelect={this.onSelect} />
                </Card>
                <Modal width={1000}  title="Appointment Table" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Table pagination={false} scroll={{y: 300}} columns={columns} dataSource={data2} />
                </Modal>
            </Fragment>
        );
    }
}

export default Appointment;
