import React, {Component, Fragment} from 'react';
import {Table, List, Col, Card, Row, Button, Calendar, Space, Modal, Form, Input, Select, InputNumber} from "antd";
import {v4 as uuidv4} from "uuid";
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
        employeeList: [],
    }

    componentDidMount() {
        console.log(uuidv4())
    }
    handleServiceSelector = (value) =>{
        this.setState({employeeList: value})
    }
    onSelect = () =>{
        this.setState({isModalVisible: true}, ()=>{

        })
    }

    handleSet = ()=>{

    }


    render() {
        const list = []
        const children = []
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i} value={uuidv4()} >{i.toString(36) + i}</Option>);
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
                                    <Button type="primary" style={{marginLeft: 40}}>add</Button>
                                </div>
                            }
                        >
                            <Table columns={columns} dataSource={data} />
                        </Card>
                    </Col>
                    <Col offset={1}>
                        <Calendar mode="month" style={{width: "calc(100vw * 0.45)"}} onSelect={this.onSelect}/>
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
