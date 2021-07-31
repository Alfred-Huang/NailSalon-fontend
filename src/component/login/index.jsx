import React, {Component, Fragment} from 'react';
import {Button, Col, Row, Card, Form, Input} from "antd";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import './index.css'
import server from "../../config/config";
import {setToken} from "../../utils/auth";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {


    componentDidMount() {
       const {token} =  this.props
        console.log(token)
    }

    submit = (values)=>{
        setToken()
        this.props.history.push('/dashboard');
        // let api = server.IP + "/login";
        // axios.post(api, values).then(()=>{
        //
        // })
    }


    render() {
        return (
            <Fragment>
                <Row justify="center">
                    <Col>
                        <Card style={{width: 500, marginTop: 300}} className="drop-shadow">
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.submit}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} style={{marginLeft: 60}}>
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state=>({userInfo: state.user}),

)(withRouter(Login));
