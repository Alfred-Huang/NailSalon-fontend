import React, {Component, Fragment} from 'react';
import {Form,Input, Row, Col, Card, Button, Tag, Modal, Select, Table,InputNumber} from "antd";
import AddingTable from "./AddingTable";
import EditableTable from "./EditableTable"
import { PlusOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;
const tagsData = ['Movies', 'Books', 'Music', 'Sports'];
class Products extends Component {

    state = {
        selectedTags: ['Books'],
        isModalVisible:false,
        dataSource:[{
            key: 0,
            brand: "",
            type: "",
            number: "",
            quantity: 0
        }],
        count:1,
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    showModal = ()=>{
        this.setState({isModalVisible: true})
    }

    handleOk = ()=>{
        this.setState({isModalVisible: false})
    }

    handleCancel = () =>{
        this.setState({isModalVisible: false})
    }

    save = () => {
        this.props.form.validateFields().then(values=>{
          console.log(values)
        })
    }

    onFinish = (values)=>{
        console.log(values)
    }

    addRow = ()=>{
        const {count, dataSource} = this.state
        const newData =  {
            key: count + 1,
            brand: "",
            type: "",
            number: "",
            quantity: 0
        }
        this.setState({dataSource: [...dataSource, newData], count: count + 1})
    }

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 50}}>
                    <Col offset={1}>
                        <Card style={{width: "calc(100vw * 0.13)"}}>
                            <Input style={{width: 200}} placeholder="Search brand or number" />
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{width: "calc(100vw * 0.64)"}}>
                            <div style={{float: "right"}}>
                                <Button  type={"link"}>Change Item Quantity</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: 5}}>
                    <Col offset={1}>
                        <div style={{width: "calc(100vw - 440px)", height: 40, display: "inline-block", backgroundColor: "white", textAlign: "center"}}>
                            {tagsData.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={this.state.selectedTags.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked)}
                                    style={{marginTop: 9, color: "black"}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col offset={1}>
                        <Button type="primary" onClick={this.showModal}>Add</Button>
                    </Col>
                    <Col>
                        <EditableTable />
                    </Col>
                    <Modal width={1000}  title="Employee Schedule" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} cancelButtonProps >
                        <div style={{marginTop: 10}}>
                            <AddingTable />
                        </div>
                    </Modal>
                </Row>
            </Fragment>
        );
    }
}

export default Products;
