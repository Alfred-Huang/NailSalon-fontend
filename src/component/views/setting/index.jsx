import React, {Component, Fragment} from 'react';
import{Row, Col, Button, Card, Form, Input, List} from "antd";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
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
                                <List
                                    bordered
                                    dataSource={data}
                                    renderItem=
                                        {item =>
                                            <List.Item>
                                                <div>
                                                    {item}
                                                </div>
                                                <div style={{textAlign: "right"}}>
                                                    <Button style={{marginLeft: 40}}>as</Button>
                                                </div>
                                            </List.Item>
                                        }
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Setting;
