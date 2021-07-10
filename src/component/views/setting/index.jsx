import React, {Component, Fragment} from 'react';
import {Row, Col, Button, Card, Form, Input, List, Table, Space,message} from "antd";
import server from "../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
const data = [
    {service: "cao", price: 20, key: '1'},
    {service: "cao", price: 20,  key: '2'},
    {service: "cao", price: 20,  key: '3'},
    {service: "cao", price: 20, key: '4'}
];


const columns = [
    {
        title: 'service',
        dataIndex: 'service',
        key: 'service',
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    }
];


class Setting extends Component {

    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };



    onFinish = (value)=>{
        const service = {serviceId: uuidv4(), service:value.service, price: value.price};
        let api = server.IP + "/setting/addService"
        axios.post(api, {service}).then((result)=>{
           this.success()
        }).catch(()=>{
            this.error()
        })
    }


    render() {
        return (
            <Fragment>
                <Row>
                    <Col offset={6} style={{marginTop: 40}}>
                        <Card style={{width: "calc(100vw * 0.4)"}}>
                            <Form layout="inline" onFinish={this.onFinish}>
                                <Form.Item
                                    label="service"
                                    name="service"
                                    rules={[{ required: true, message: 'Please input service!' }]}
                                >
                                    <Input style={{borderTop: "0px", borderLeft: "0px", borderRight: "0px"}} />
                                </Form.Item>
                                <Form.Item
                                    label="price"
                                    name="price"
                                    rules={[{ required: true, message: 'Please input price!', pattern: new RegExp(/^[1-9]\d*$/, "g")}]}
                                >
                                    <Input style={{borderTop: "0px", borderLeft: "0px", borderRight: "0px"}} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div style={{marginTop: 30}}>
                               <Table  style={{marginTop: 10}} pagination={false} scroll={{y: 300}} columns={columns} dataSource={data} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Setting;
