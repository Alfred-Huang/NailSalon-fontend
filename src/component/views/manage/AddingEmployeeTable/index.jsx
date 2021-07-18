import React, {Component,Fragment} from 'react';
import {Form, Input, Button, Space, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import server from "../../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {connect} from "react-redux";
import {addEmployee, deleteEmployee, setEmployee} from "../../../../redux/action/employee";

class AddingEmployeeTable extends Component {

    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    sendClickResult = () =>{
        return ()=>{
            this.props.getClickResult(false);
        }
    }

    onFinish = (values)=>{
        const dataList = [];
        for(let i = 0; i < values.list.length; i++){
            const data = values.list[i];
            dataList.push({employeeId: uuidv4(), ...data})
        }
        const employeeList = [...dataList];
        const employeeListForAdd = dataList.map((item)=>({employee_id: item.employeeId, employee_name: item.name}))
        let api = server.IP + "/manage/addEmployee"
        axios.post(api, {employeeList}).then((result)=>{
            this.props.addEmployee(employeeListForAdd)
            this.success()
            this.sendClickResult()
        }).catch(()=>{
            this.error()
        })
    }
    render() {
        return (
            <Fragment>
                <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="on" style={{textAlign: "center"}}>
                <Form.List name="list" initialValue={[1]}  >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: "40%", marginRight: "40%" }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    fieldKey={[fieldKey, 'name']}
                                >
                                    <Input placeholder="Enter Employee Name" />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
                </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }
}

export default connect(
    state => ({employee: state.employee}),
    {addEmployee: addEmployee, setEmployee: setEmployee, deleteEmployee: deleteEmployee}
)(AddingEmployeeTable);
