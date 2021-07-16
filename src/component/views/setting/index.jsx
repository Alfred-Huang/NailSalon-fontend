import React, {Component, Fragment} from 'react';
import {Popconfirm,Row, Col, Button, Card, Form, Input, List, Table, Space, message, Modal, Select, InputNumber} from "antd";
import server from "../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {connect} from "react-redux";
import {addService, setService, updateService, deleteService} from "../../../redux/action/index";


class Setting extends Component {

    state = {
        editServiceMode: false,
        deleteServiceMode: false,
        service_id: "",
        service: "",
        price: 0,
        deleteId: ""
    }


    handleEditService = (e) =>{
        this.setState({service: e.target.value})
    }
    handleEditPrice = (e) =>{
        this.setState({price: e})
    }


    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    componentDidMount() {
        let api = server.IP + "/setting/getServiceList"
        axios.post(api).then((result)=>{
            const list = {list: result.data}
            this.props.setService(list)
        }).catch(()=>{
            this.error()
        })
    }

    onFinish = (value)=>{
        const service = {serviceId: uuidv4(), service:value.service, price: value.price};
        let api = server.IP + "/setting/addService"
        axios.post(api, {service}).then((result)=>{
           this.success()
        }).catch(()=>{
            this.error()
        })
    }
    handleServiceEdit = (value)=>{
        let target = this.props.serviceList.list.filter((item)=>{
            return item.service_id === value
        })
        this.setState({editServiceMode: true, service: target[0].service, price: target[0].price, serviceId: value})
    }

    handleServiceDelete = (value) =>{
        this.setState({deleteId: value, deleteServiceMode: true})
    }


    handleEditOk= ()=>{
        const service = {serviceId: this.state.serviceId, service: this.state.service, price: this.state.price};
        let api = server.IP + "/setting/updateService"
        axios.post(api, {service}).then((result)=>{
            this.props.updateService(service)
            this.success()
        }).catch(()=>{
            this.error()
        })
        this.setState({editServiceMode: false})
    }

    handleDeleteOk = () =>{
        let api = server.IP + "/setting/deleteService"
        let id = this.state.deleteId
        axios.post(api, {id}).then((result)=>{
            this.props.deleteService(this.state.deleteId)
            this.success()
        }).catch(()=>{
            this.error()
        })
        this.setState({deleteServiceMode: false})
    }

    handleDeleteCancel = () =>{
        this.setState({deleteServiceMode: false})
    }

    handleEditCancel = ()=>{
        this.setState({editServiceMode: false})
    }

    render() {
        const data = this.props.serviceList.list.map(item =>({key: item.service_id, service: item.service, price: item.price}))
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
                        <a onClick={(e)=>this.handleServiceEdit(record.key)}>Edit</a>
                        <a onClick={(e)=>this.handleServiceDelete(record.key)}>Delete</a>
                    </Space>
                ),
            }
        ];
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
                        <Modal width={1000}  title="Edit" visible={this.state.editServiceMode} onOk={this.handleEditOk} onCancel={this.handleEditCancel}>
                            <div>
                                <Input value={this.state.service} onChange={(e)=>this.handleEditService(e)} />
                                <InputNumber
                                    value={this.state.price}
                                    onChange={this.handleEditPrice}
                                    formatter={
                                        value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </div>
                        </Modal>
                        <Modal width={500}  title="delete" visible={this.state.deleteServiceMode} onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel}>
                            <div style={{textAlign: "center"}}>
                               <a style={{fontSize: 20}}>Are you sure to delete this?</a>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state =>({serviceList: state.service}),
    {setService: setService, addService: addService, updateService: updateService, deleteService: deleteService}
)(Setting);
