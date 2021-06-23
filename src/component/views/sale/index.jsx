import React, {Component, Fragment} from 'react';
import {Tag, Space, Table, Button, DatePicker, Col, Card, Row, Divider, Form, Input, InputNumber, Select} from "antd";
import moment from 'moment';
const { Option } = Select;
const { Search } = Input;
const dateFormat = 'YYYY/MM/DD';
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
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
class Sale extends Component {

    onSearch  = () =>{

    }

    onFinish = ()=>{

    }

    onFinishFailed = ()=>{

    }

    render() {
        return (
            <Fragment>
                <Row style={{marginLeft: 150, marginTop: 50}}>
                    <Col>
                        <Card
                            style={{width: "calc(100vw * 0.3)"}}
                        >
                            <p style={{marginRight: 30, marginBottom: 5}}>Date:</p>
                            <DatePicker style={{width: 200}} defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                            <Divider/>
                            <Row justify={"center"}>
                                <Form
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
                                >
                                    <Form.Item label="Services" style={{width: 500}}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            defaultValue={['a10', 'c12']}
                                            onChange={handleChange}
                                        >
                                            {children}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Staff">
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            defaultValue={['a10', 'c12']}
                                            onChange={handleChange}
                                        >
                                            {children}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Time">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Price">
                                        <InputNumber
                                            formatter={
                                                value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Disc">
                                        <InputNumber/>
                                    </Form.Item>
                                    <Form.Item label="Total">
                                    <InputNumber
                                        formatter={
                                        value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        }
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form.Item>
                                </Form>
                            </Row>
                            <Divider/>
                        </Card>

                    </Col>
                    <Col>
                        <Card
                            style={{width: 750}}
                            extra={
                                <Search placeholder="input search text" onSearch={this.onSearch()} style={{ width: 200 }} />
                            }
                            headStyle={{alignItems: "left"}}
                        >
                            <Table columns={columns} dataSource={data} />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Sale;
