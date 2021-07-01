import React, {Component,Fragment} from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class AddingTable extends Component {

    onFinish = (values)=>{
        console.log('Received values of form:', values);
    }
    render() {
        return (
            <Fragment>
                <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="on">
                <Form.List name="users" initialValue={[1]} >
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

export default AddingTable;
