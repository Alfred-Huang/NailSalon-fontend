import React, {Component, Fragment} from 'react';
import {List,Row, Col, Form, Input, Button, Checkbox,Card,Select} from "antd"
const { Option } = Select;


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}


const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
class Payment extends Component {
    d = ()=>{
        console.log("---")
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Card>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Value"
                                name="value"
                                rules={[{ required: true, message: 'Please input value!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="service"
                                name="service"
                                rules={[{ required: true, message: 'Please input service' }]}
                            >
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={handleChange}>
                                    {children}
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
                <Row>
                    <Card>
                        <List
                            bordered
                            dataSource={data}
                            renderItem={
                                item => <List.Item onClick={(e)=>this.d()}>{item} <Button>a</Button> </List.Item>
                            }
                        />
                    </Card>
                </Row>
            </Fragment>
        );
    }
}

export default Payment;
