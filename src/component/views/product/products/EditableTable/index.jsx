import React, {useContext, useState, useEffect, useRef, Fragment} from 'react';
import {Table, Input, Button, Popconfirm, Form, Card, message} from 'antd';
import "./index.css"
import {connect} from "react-redux";
import {deleteEmployee, deleteProduct, setProduct} from "../../../../../redux/action";
import {updateProduct} from "../../../../../redux/action/product";
import server from "../../../../../config/config";
import axios from "axios";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'brand',
                dataIndex: 'brand',
                editable: true,
            },
            {
                title: 'type',
                dataIndex: 'type',
                editable: true,
            },
            {
                title: 'number',
                dataIndex: 'number',
                editable: true,
            },
            {
                title: 'quantity',
                dataIndex: 'quantity',
                editable: true,
            },

            {
                title: 'operation',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.props.product.list.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }


    handleDelete = (id) => {
        const dataSource = [...this.props.product.list];
        const newProduct = {list: dataSource.filter((item) => item.productId !== id)}
        let api = server.IP + "/product/deleteProduct";
        let targetId = id;
        axios.post(api, {targetId}).then((result)=>{
            this.props.setProduct(newProduct)
            this.props.getProductBrandTagWithoutGetAlProduct()
            this.success()
        }).catch(()=>{
            this.error("Fail to update data")
        })

    };

    handleSave = (row) => {
        let api = server.IP + "/product/updateProduct";
        const data = {productId: row.id, brand: row.brand, type: row.type, number: row.number, quantity: row.quantity}
        axios.post(api, {data}).then((result)=>{
            const newData = [...this.props.product.list];
            const index = newData.findIndex((item) => row.id === item.productId);
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            const newProduct = {list: newData}
            this.props.setProduct(newProduct)
        }).catch(()=>{
            this.error("Fail to update data")
        })
    };
    success = () => {
        message.success('Success');
    }

    error = (mesg) => {
        message.error(mesg);
    };
    render() {

       let dataSource =  this.props.product.list.map((item, index)=>({
            key: index,
            id: item.productId,
            brand: item.brand,
            type: item.type,
            number: item.number,
            quantity: item.quantity}))

        let searchList = this.props.searchList.list.map((item, index)=>({
                        key: index,
                        id: item.productId,
                        brand: item.brand,
                        type: item.type,
                        number: item.number,
                        quantity: item.quantity}))
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <Fragment>
                <Card style={{width: "calc(100vw * 0.7)", height: 745}}>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={ searchList.length > 0 ? (searchList.length === dataSource.length ? dataSource : searchList) : dataSource}
                        columns={columns}
                        scroll={{y: 600}}
                    />
                </Card>
            </Fragment>
        );
    }
}
export default connect(
    state =>({product: state.product}),
    {updateProduct: updateProduct, deleteProduct: deleteProduct, setProduct: setProduct}
)(EditableTable)
