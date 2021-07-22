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
import moment from 'moment';
import server from "../../../config/config";
import axios from "axios";
import {connect} from "react-redux";
import {addEmployee, deleteEmployee, setEmployee} from "../../../redux/action/employee";
import {addSchedule, deleteSchedule, setSchedule} from "../../../redux/action/schedule";
const { Option } = Select;



class Manage extends Component {

    state = {
        isModalVisible: false,
        isAddModalVisible: false,
        employeeList: [],
        date: "",
        targetId: "",
        employeeModal: false
    }
    componentDidMount() {
        let api = server.IP + "/manage/getEmployee"
        axios.post(api).then((result)=>{
            const list = {list: result.data}
            this.props.setEmployee(list)
        }).catch(()=>{
            this.error()
        })
    }
    handleServiceSelector = (value) =>{
        this.setState({employeeList: value},()=>{
            console.log(this.state.employeeList)
        })
    }

    onSelect = (value) =>{
        const date = value.format("YYYY-MM-DD")
        this.setState({isModalVisible: true, date: date},()=>{
            let api = server.IP + "/manage/getSchedule"
            axios.post(api, {date}).then((result)=>{
                let scheduleList = {list: result.data}
                this.props.setSchedule(scheduleList)
            }).catch(()=>{
                this.error()
            })
        })
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
        if(this.props.schedule.list.length !== 0){
            this.updateSchedule(employee)
        }else{
            let api = server.IP + "/manage/addSchedule";
            axios.post(api, {schedule}).then((result)=>{
                this.props.addSchedule(this.state.employeeList)
                this.success()
            }).catch(()=>{
                this.error()
            })
        }
    }

    updateSchedule = (employee)=>{
        employee += " ";
        for(let i = 0; i < this.props.schedule.list.length; i++){
            employee += this.props.schedule.list[i]
            if(i !== this.props.schedule.list.length - 1){
                employee += " ";
            }
        }
        let data = {date: this.state.date, employee: employee}
        let api = server.IP + "/manage/updateSchedule";
        axios.post(api, {data}).then((result)=>{
            this.props.addSchedule(this.state.employeeList);
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

    handleEmployeeDelete = (targetId)=>{
        this.setState({targetId: targetId, employeeModal: true})
    }

    handleEmployeeDeleteOk = () =>{
        let api = server.IP + "/manage/deleteEmployee"
        let id = this.state.targetId
        axios.post(api, {id}).then((result)=>{
            this.props.deleteEmployee(id)
            this.success()
        }).catch(()=>{
            this.error()
        })
        this.setState({employeeModal: false})
    }

    handleScheduleDelete = (targetIndex)=>{
        let newSchedule = this.props.schedule.list.filter((item, index)=>{
            return index !== targetIndex;
        })
        let api = server.IP + "/manage/deleteSchedule"
        let employee = ""
        for(let i = 0; i < newSchedule.length; i++){
            employee += newSchedule[i]
            if(i !== newSchedule.length - 1){
                employee += " ";
            }
        }
        let data = {date: this.state.date, employee: employee}
        axios.post(api, {data}).then((result)=>{
            this.props.deleteSchedule(newSchedule)
            this.success()
        }).catch(()=>{
            this.error()
        })
    }

    handleEmployeeDeleteCancel = ()=>{
        this.setState({employeeModal: false})
    }


    getClickResult = (value)=>{
        this.setState({employeeModal: value})
    }

    render() {
        const employeeColumns = [
            {
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
                        <a onClick={(e)=>this.handleEmployeeDelete(record.key)}>Delete</a>
                    </Space>
                ),
            }
        ];
        const scheduleColumns = [
            {
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
                        <a onClick={(e)=>this.handleScheduleDelete(record.key)}>Delete</a>
                    </Space>
                ),
            }
        ];
        let employeeList = this.props.employee.list.map((item)=>({key: item.employee_id, name: item.employee_name}))
        let scheduleList = this.props.schedule.list.map((item, index)=>({key: index, name: item}))
        let employeeSelection = []
        for (let i = 0; i < this.props.employee.list.length; i++) {
            employeeSelection.push(<Option key={this.props.employee.list[i].employee_name} >{this.props.employee.list[i].employee_name}</Option>);
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
                            <Table columns={employeeColumns} dataSource={employeeList} />
                        </Card>
                        <Modal width={1000}  title="Employee" visible={this.state.isAddModalVisible} onOk={this.handleAddOk} onCancel={this.handleAddCancel}>
                            <AddingEmployeeTable getClickResult={this.getClickResult}/>
                        </Modal>
                    </Col>
                    <Col offset={1}>
                        <Calendar  style={{width: "calc(100vw * 0.45)"}} onSelect={this.onSelect}/>
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
                                {employeeSelection}
                            </Select>
                            <Button style={{marginLeft: 30}} type={"primary"} onClick={this.handleSet}>Set</Button>
                            <Table  style={{marginTop: 10}} pagination={false} scroll={{y: 300}} columns={scheduleColumns} dataSource={scheduleList} />
                        </div>
                    </Modal>
                    <Modal width={1000}  title="Delete" visible={this.state.employeeModal} onOk={this.handleEmployeeDeleteOk} onCancel={this.handleEmployeeDeleteCancel}>
                        <div style={{textAlign: "center"}}>
                            <a style={{fontSize: 20}}>Are you sure to delete this?</a>
                        </div>
                    </Modal>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({employee: state.employee, schedule: state.schedule}),
    {
        addEmployee: addEmployee, setEmployee: setEmployee, deleteEmployee: deleteEmployee,
        addSchedule: addSchedule, setSchedule: setSchedule, deleteSchedule: deleteSchedule,
        }
)(Manage);
