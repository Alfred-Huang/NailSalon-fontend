import React, {useContext, useState, useEffect, useRef, Fragment} from 'react';
import {Table, Input, Button, Popconfirm, Form, Card} from 'antd';
import "./index.css"

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
            console.log(record.id)
            console.log("-------------------------------")
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
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    id: "1",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 1,
                },
                {
                    key: '1',
                    id: "2",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 2,
                },
                {
                    key: '2',
                    id: "3",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '3',
                    id: "4",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '4',
                    id: "5",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '5',
                    id: "6",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '6',
                    id: "7",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '7',
                    id: "8",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '8',
                    id: "9",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '9',
                    id: "10",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
                {
                    key: '10',
                    id: "11",
                    brand: 'Edward King 0',
                    type: 'asdas',
                    number: '234',
                    quantity: 0,
                },
            ],
            count: 2,
        };
    }

    handleDelete = (id) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.id !== id),
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const { dataSource } = this.state;
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
                        dataSource={dataSource}
                        columns={columns}
                        scroll={{y: 600}}
                    />
                </Card>
            </Fragment>
        );
    }
}
export default EditableTable;
