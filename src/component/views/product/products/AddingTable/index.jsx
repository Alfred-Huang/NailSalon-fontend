import React, {Component,Fragment} from 'react';
import {Form, Input, Button, Space, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import server from "../../../../../config/config";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {connect} from "react-redux";
import {setProduct} from "../../../../../redux/action";

class AddingTable extends Component {
    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };




    onFinish = (values)=>{
        const dataList = [];
        for(let i = 0; i < values.list.length; i++){
            const data = values.list[i];
            dataList.push({productId: uuidv4(), ...data})
        }
        const productList = [...dataList];
        let api = server.IP + "/product/addProduct"
        axios.post(api, {productList}).then((result)=>{
            const data = {list: productList}
            this.props.setProduct(data)
            this.props.setSelectTag()
            this.success()
        }).catch(()=>{
            this.error()
        })
    }
    render() {
        return (
            <Fragment>
                <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="on">
                <Form.List name="list" initialValue={[1]} >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 10 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'brand']}
                                    fieldKey={[fieldKey, 'brand']}
                                >
                                    <Input placeholder="Enter Product Brand" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'type']}
                                    fieldKey={[fieldKey, 'type']}
                                >
                                    <Input placeholder="Enter Product Type" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'number']}
                                    fieldKey={[fieldKey, 'number']}
                                >
                                    <Input placeholder="Enter Product Number" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'quantity']}
                                    fieldKey={[fieldKey, 'quantity']}
                                >
                                    <Input placeholder="Enter Quantity" />
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

export default  connect(
    state =>({product: state.product}),
    {setProduct: setProduct}
)(AddingTable);
