import React, {Component, Fragment} from 'react';
import {
    Table,
    List,
    Col,
    Card,
    Row,
    Button,
    Calendar,
    Space,
    Modal,
    Form,
    Input,
    Select,
    message
} from "antd";
import AddingEmployeeTable from "./AddingEmployeeTable";
import {v4 as uuidv4} from "uuid";

import server from "../../../config/config";
import axios from "axios";
const { Option } = Select;
const data = []



const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    }
];


class Manage extends Component {

    state = {
        isModalVisible: false,
        isAddModalVisible: false,
        employeeList: [],
        date: ""
    }

    handleServiceSelector = (value) =>{
        this.setState({employeeList: value})
    }

    onSelect = (value) =>{
        const date = value.format("YYYY/MM/DD")
        this.setState({isModalVisible: true, date: date})
    }

    handleSet = ()=>{
        let employee = "";
        for(let i = 0; i < this.state.employeeList.length; i++){
            employee += this.state.employeeList[i];
            if(i !== this.state.employeeList.length - 1){
                employee += " ";
            }
        }
        const schedule = {date: this.state.date, employee: employee};
        let api = server.IP + "/manage/addSchedule";
        axios.post(api, {schedule}).then((result)=>{
           this.success()
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

    handleAdd = ()=>{
        this.setState({isAddModalVisible: true})
    }

    handleAddOk = () =>{
        this.setState({isAddModalVisible: false})
    }

    handleAddCancel = ()=>{
        this.setState({isAddModalVisible: false})
    }

    handleAddEmployee = ()=>{

    }

    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    render() {
        const list = []
        const children = []
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i} value={i.toString(36) + i} >{i.toString(36) + i}</Option>);
        }
        return (
            <Fragment>
                <Row justify={"center"} style={{marginTop: 50}}>
                    <Col offset={1}>
                        <Card
                            style={{width: "calc(100vw * 0.23)"}}
                            title={"Employee Manage"}
                            extra={
                                <div style={{textAlign: "right"}}>
                                    <Button type="primary" style={{marginLeft: 40}} onClick={this.handleAdd}>add</Button>
                                </div>
                            }
                        >
                            <Table columns={columns} dataSource={data} />
                        </Card>
                        <Modal width={1000}  title="Employee" visible={this.state.isAddModalVisible} onOk={this.handleAddOk} onCancel={this.handleAddCancel}>
                            <AddingEmployeeTable/>
                        </Modal>
                    </Col>
                    <Col offset={1}>
                        <Calendar mode="month" style={{width: "calc(100vw * 0.45)"}} onChange={this.onSelect}/>
                    </Col>
                    <Modal width={1000}  title="Employee Schedule" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <div style={{marginTop: 10, textAlign: "center"}}>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '50%'}}
                                placeholder="Please select"
                                onChange={this.handleServiceSelector}
                            >
                                {children}
                            </Select>
                            <Button style={{marginLeft: 30}} type={"primary"} onClick={this.handleSet}>Set</Button>
                            <Table  style={{marginTop: 10}} pagination={false} scroll={{y: 300}} columns={columns} dataSource={list} />
                        </div>
                    </Modal>
                </Row>
            </Fragment>
        );
    }
}

export default Manage;
