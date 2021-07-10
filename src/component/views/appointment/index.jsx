import React, {Component, Fragment} from 'react';
import {
    Button,
    Select,
    Space,
    Card,
    Modal,
    Calendar,
    List,
    Row,
    Col,
    Table,
    Tag,
    Form,
    Input,
    InputNumber,
    message
} from "antd";
import moment from 'moment';
import server from "../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
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
    formRef = React.createRef();
    state = {
        isModalVisible: false,
        services: [],
        employees:[],
        date: ""
    }

    handleOk = ()=>{
        this.setState({isModalVisible: false})
    }

    handleCancel = ()=>{
        this.setState({isModalVisible: false})
    }

    onSelect = (value) =>{
        const date = value.format("YYYY/MM/DD")
        this.setState({isModalVisible: true, date: date})
    }
    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    onFinish = (value)=> {

        let employee = "";
        for (let i = 0; i < value.employees.length; i++) {
            employee += value.employees[i];
            if(i !== value.services.length - 1){
                employee += " "
            }
        }
        let service = "";
        for (let j = 0; j < value.services.length; j++) {
            service += value.services[j];
            if(j !== value.services.length - 1){
                service += " "
            }
        }
        console.log(employee)
        const appointment = {
            appointmentId: uuidv4(), customer: value.customer, service: service,
            employee: employee, people: value.people, date: this.state.date, time: value.time
        }
        let api = server.IP + "/appointment/addAppointment";
        axios.post(api, {appointment}).then((result) => {
            this.success()
            this.setState({  services: [], employees:[]})
            this.reset();
        }).catch(()=>{
            this.error()
        })

    }

    reset = ()=>{
        this.formRef.current.resetFields();
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
                        onFinish={this.onFinish}
                        ref={this.formRef}
                    >
                        <Form.Item
                            label="Name"
                            name="customer"
                            rules={[{ required: true, message: 'Please enter name!'}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Services" name="services">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 300 }}
                                placeholder="Please select"
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="people"
                            name="people"
                            rules={[{ required: true, message: 'Please input number of people!', pattern: new RegExp(/^[1-9]\d*$/, "g")}]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item style={{marginTop: 10}} label="Employee" name="employees">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 300 }}
                                placeholder="Please select"
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{marginTop: 10}}
                            label="Time" name="time"
                            rules={[{ required: true, message: 'Please input hh : ss!', pattern: new RegExp(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "y")}]}
                        >
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
