import React, {Component, Fragment} from 'react';
import {Input, Row, Col, Card, Button, Tag, Modal, message} from "antd";
import AddingTable from "./AddingTable";
import EditableTable from "./EditableTable"
import server from "../../../../config/config";
import axios from "axios";
import {connect} from "react-redux";
import {searchNumber, searchType, setProduct} from "../../../../redux/action";


const { CheckableTag } = Tag;
class Products extends Component {

    state = {
        selectedTags: [],
        isModalVisible:false,
        brandTag: [],
        searchList:{list:[]},
        searchFlag: false,
    };

    componentDidMount() {
        this.getProductBrandTag()
        this.getAllProduct();
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        let getProductApi = server.IP + "/product/getProductByTags";
        const tagList = nextSelectedTags
        if(tagList.length === 0){
            this.getAllProduct()
        }else{
            axios.post(getProductApi, {tagList}).then((result)=>{
                const data = {list: result.data}
                this.props.setProduct(data)
            }).catch(()=>{
                this.error("Fail to load data")
            })
            this.setState({ selectedTags: nextSelectedTags, searchList: {list: []}});
        }

    }

    getProductBrandTag = ()=>{
        let getBrandTagApi = server.IP + "/product/getBrandTag";
        axios.post(getBrandTagApi).then((result)=>{
            this.setState({brandTag: result.data})
        }).catch(()=>{
            this.error("Fail to load tag")
        })
        this.getAllProduct();
    }


    getProductBrandTagWithoutGetAlProduct = ()=>{
        let getBrandTagApi = server.IP + "/product/getBrandTag";
        axios.post(getBrandTagApi).then((result)=>{
            this.setState({brandTag: result.data})
        }).catch(()=>{
            this.error("Fail to load tag")
        })
    }

    setSelectTag = () =>{
        this.setState({ selectedTags: []});
    }

    getAllProduct = ()=>{
        let getProductApi = server.IP + "/product/getProduct";
        axios.post(getProductApi).then((result)=>{
            const data = {list: result.data}
            this.props.setProduct(data)
        }).catch(()=>{
            this.error("Fail to load data")
        })
        this.setState({ selectedTags: [], searchList: {list: []}});
    }
    success = () => {
        message.success('Success');
    }


    error = (mesg) => {
        message.error(mesg);
    };

    showModal = ()=>{
        this.setState({isModalVisible: true})
    }

    handleOk = ()=>{
        this.getProductBrandTagWithoutGetAlProduct()
        this.setState({isModalVisible: false})
    }

    handleCancel = () =>{
        this.getProductBrandTagWithoutGetAlProduct()
        this.setState({isModalVisible: false})
    }

    handleSearchType = (e)=>{
        let resArr = {list:[]};
        this.props.product.list.filter(item => {
            if (item.type.indexOf(e.target.value) >= 0) {
                resArr.list.push(item);
            }
        })
       this.setState({searchList: resArr});
    }

    handleSearchNumber = (e)=>{
        let resArr = {list:[]};
        this.props.product.list.filter(item => {
            if (item.number.indexOf(e.target.value) >= 0) {
                resArr.list.push(item);
            }
        })
        this.setState({searchList: resArr});
    }

    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 50}}>
                    <Col offset={1}>
                        <Card style={{width: "calc(100vw * 0.13)"}}>
                            <Input onChange={(e)=>this.handleSearchType(e)} style={{width: 200}} placeholder="Search type" />
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{width: "calc(100vw * 0.13)"}}>
                            <Input onChange={(e)=>this.handleSearchNumber(e)} style={{width: 200}} placeholder="Search number" />
                        </Card>
                    </Col>
                    <Col  style={{width: "calc(100vw * 0.51)"}}>

                    </Col>
                </Row>
                <Row style={{marginTop: 5}}>
                    <Col offset={1}>
                        <div style={{width: "calc(100vw - 440px)", height: 40, display: "inline-block", backgroundColor: "white", textAlign: "center"}}>
                            <div style={{display: "inline-block"}}>
                                <Button  type="link" block style={{display: "inline-block"}} onClick={this.getAllProduct}>All</Button>
                            </div>
                            {this.state.brandTag.map(tag => (
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
                        <EditableTable getProductBrandTagWithoutGetAlProduct={this.getProductBrandTagWithoutGetAlProduct} searchList={this.state.searchList}/>
                    </Col>
                    <Modal width={1000}  title="Employee Schedule" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} cancelButtonProps >
                        <div style={{marginTop: 10}}>
                            <AddingTable getProductBrandTagWithoutGetAlProduct={this.getProductBrandTagWithoutGetAlProduct} setSelectTag={this.setSelectTag}/>
                        </div>
                    </Modal>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state =>({product: state.product}),
    {setProduct: setProduct, searchType: searchType, searchNumber: searchNumber}
)(Products);
