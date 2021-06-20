import React, {Component, Fragment} from 'react';
import {Button,Select, Space, Card, Modal, Calendar, List, Row, Col, Table, Tag, Form, Input, InputNumber} from "antd";
import moment from 'moment';
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
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
                    <Form
                        size={"small"}
                        layout={"inline"}
                        style={{marginLeft: 90}}
                    >
                        <Form.Item label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Service">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 300 }}
                                placeholder="Please select"
                                defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Form.Item label="people">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item style={{marginTop: 10}} label="Employee">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 300 }}
                                placeholder="Please select"
                                defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{marginTop: 10}} label="Time">
                           <Input/>
                        </Form.Item>
                        <Form.Item style={{marginTop: 10}}>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{marginTop: 10}}>
                        <Table  pagination={false} scroll={{y: 300}} columns={columns} dataSource={data2} />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default Appointment;
