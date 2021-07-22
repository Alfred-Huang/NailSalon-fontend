import React, {Component, Fragment} from 'react';
import {
    Button,
    Select,
    Space,
    Card,
    Modal,
    Calendar,
    Table,
    Form,
    Input,
    InputNumber,
    message
} from "antd";
import server from "../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {connect} from "react-redux";
import {setEmployee, setService} from "../../../redux/action";
const { Option } = Select;


class Appointment extends Component {
    formRef = React.createRef();
    state = {
        isModalVisible: false,
        services: [],
        employees:[],
        date: "",
        dataSource: [],
    }

    componentDidMount() {
        let serviceApi = server.IP + "/setting/getServiceList"
        axios.post(serviceApi).then((result)=>{
            const list = {list: result.data}
            this.props.setService(list)
        }).catch(()=>{
            this.error()
        })
        let employeeApi = server.IP + "/manage/getEmployee"
        axios.post(employeeApi).then((result)=>{
            const list = {list: result.data}
            this.props.setEmployee(list)
        }).catch(()=>{
            this.error()
        })
    }

    handleOk = ()=>{
        this.setState({isModalVisible: false})
    }

    handleCancel = ()=>{
        this.setState({isModalVisible: false})
    }

    onSelect = (value) =>{
        const date = value.format("YYYY-MM-DD")
        this.setState({isModalVisible: true, date: date},()=>{
            let api = server.IP + "/appointment/getAppointment";
            let targetDate = date
            axios.post(api, {targetDate}).then((result)=>{
                this.setState({dataSource: result.data})
            }).catch(()=>{
                this.error()
            })
        })
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
        const appointment = {
            appointmentId: uuidv4(), customer: value.customer, service: service,
            employee: employee, people: value.people, date: this.state.date, time: value.time
        }
        const newAppointment = {appointment_id: appointment.appointmentId, customer: value.customer, service: service,
            employee: employee, people: value.people, date: this.state.date, time: value.time}
        let api = server.IP + "/appointment/addAppointment";
        axios.post(api, {appointment}).then((result) => {
            this.setState({  services: [], employees:[], dataSource: [newAppointment,...this.state.dataSource]})
            this.success()
            this.reset();
        }).catch(()=>{
            this.error()
        })

    }

    deleteAppointment = (id)=>{
        let api = server.IP + "/appointment/deleteAppointment";
        let targetId = id
        axios.post(api, {targetId}).then((result) => {
           let newState = this.state.dataSource
            newState = newState.filter((item)=>{
                return item.appointment_id !== id
            })
            this.setState({dataSource: newState})
        }).catch(()=>{
            this.error()
        })
    }

    reset = ()=>{
        this.formRef.current.resetFields();
    }


    render() {

        const data = this.state.dataSource.map((item)=>({key: item.appointment_id, customer: item.customer, service: item.service, people: item.people, employee: item.employee, time: item.time}))
        const columns = [
            {
                title: 'Name',
                dataIndex: 'customer',
                key: 'customer',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Services',
                key: 'service',
                dataIndex: 'service',

            },
            {
                title: 'People',
                dataIndex: 'people',
                key: 'people',
            },
            {
                title: 'Employees',
                key: 'employee',
                dataIndex: 'employee',
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
                        <a onClick={(e)=>this.deleteAppointment(record.key)}>Delete</a>
                    </Space>
                ),
            },
        ];

        const employeeSelection = [];
        const serviceSelection = [];
        for (let i = 0; i < this.props.employeeList.list.length; i++) {
            employeeSelection.push(<Option key={this.props.employeeList.list[i].employee_name} >{this.props.employeeList.list[i].employee_name}</Option>);
        }

        for (let i = 0; i < this.props.serviceList.list.length; i++) {
            serviceSelection.push(<Option key={this.props.serviceList.list[i].service}>{this.props.serviceList.list[i].service}</Option>);
        }
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
                                {serviceSelection}
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
                                {employeeSelection}
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
                        <Table  pagination={false} scroll={{y: 300}} columns={columns} dataSource={data} />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default  connect(
    state =>({employeeList: state.employee, serviceList: state.service}),
    {setService: setService, setEmployee: setEmployee}
)(Appointment);
