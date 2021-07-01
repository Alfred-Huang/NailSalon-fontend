import React, {Component, Fragment} from 'react';
import {Row, Col, Button, Card, Form, Input, List, Table, Space} from "antd";

const data = [
    {service: "cao", price: 20},
    {service: "cao", price: 20},
    {service: "cao", price: 20},
    {service: "cao", price: 20}
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
    render() {
        return (
            <Fragment>
                <Row>
                    <Col offset={6} style={{marginTop: 40}}>
                        <Card style={{width: "calc(100vw * 0.4)"}}>
                            <Form layout="inline">
                                <Form.Item
                                    label="service"
                                    name="service"
                                >
                                    <Input style={{borderTop: "0px", borderLeft: "0px", borderRight: "0px"}} />
                                </Form.Item>
                                <Form.Item
                                    label="value"
                                    name="value"
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
