import React, {Component, Fragment} from 'react';
import {
    Tag,
    Space,
    Table,
    Button,
    DatePicker,
    Col,
    Card,
    Row,
    Divider,
    Form,
    Input,
    InputNumber,
    Select,
    message
} from "antd";
import moment from 'moment';
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import server from "../../../config/config";
import employee from "../../../redux/reducers/employee";
import {connect} from "react-redux";
const { Option } = Select;
const { Search } = Input;



const dateFormat = 'YYYY/MM/DD';

function handleChange(value) {
    console.log(`selected ${value}`);
}


const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'services',
        dataIndex: 'services',
        key: 'services',
    },
    {
        title: 'stuffs',
        dataIndex: 'stuffs',
        key: 'stuffs',
    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    }
];

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
class Sale extends Component {


    state = {
        employees: [],
        services:[],
        priceList:[],
        date: "",
        totalPrice: 0,
    }

    componentDidMount() {
        this.setState({date: moment().format("YYYY/MM/DD")})

    }

    onSearch  = () =>{

    }


    onFinish = ()=>{
        let id = uuidv4()
        const saleRecord = {
            saleId: id, employees: this.state.employees,
            services: this.state.services,
            priceList: this.state.priceList,
            totalPrice: this.state.totalPrice,
            date: this.state.date,
            time: moment().format("HH:mm")
        }
        let api = server.IP + "/sale/addSaleRecord";
        axios.post(api, {saleRecord}).then((result)=>{
           this.success()
        }).catch(()=>{
            this.error()
        })
    }

    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    handleTotalPrice = (value) =>[
        this.setState({totalPrice: value})
    ]
    handleDatePicker = (date, dateString) =>{
        this.setState({date: dateString})
    }

    handleServiceSelector = (value)=>{
        this.setState({services: value})
    }

    handlePrice = (value, index) =>{
         const list = this.state.priceList
         const len = this.state.employees.length
        list.splice(index,1,value);
         let sum = 0
         for(let i = 0; i < len; i++){
             sum += list[i]
         }
        this.setState({priceList: list, totalPrice: sum})
    }

    handleEmployeeSelector = (value)=>{
        this.setState({employees: value})
    }

    renderPriceList = ()=>{
        const len = this.state.employees.length
        if(len <= 1){
              return  (<Row style={{marginTop: 10}}>
                    <Col offset={2}>
                        <p style={{margin: 1}}>price: </p>
                        <InputNumber
                            onChange={(e)=>this.handlePrice(e, 0)}
                            formatter={
                                value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Col>
                </Row>)
        }else{
          return this.state.employees.map((name, key)=>{
                return <Row style={{marginTop: 10}} key={key}>
                        <Col offset={2}>
                            <p style={{margin: 1}}>price for {name}: </p>
                            <InputNumber
                                onChange={(e)=>this.handlePrice(e, key)}
                                formatter={
                                    value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Col>
                    </Row>
            })
        }
    }

    render() {
        const children = [];
        for (let i = 0; i < this.props.employeeList.length; i++) {
            children.push(<Option key={this.props.employeeList[i].employeeId}>{this.props.employeeList[i].name}</Option>);
        }
        return (
            <Fragment>
                <Row justify={"center"} style={{ marginTop: 50}}>
                    <Col>
                        <Card
                            style={{width: "calc(100vw * 0.5)"}}
                        >
                            <p style={{marginRight: 30, marginBottom: 5}}>Date:</p>
                            <DatePicker onChange={this.handleDatePicker} style={{width: 200}} value={moment(moment().format())} format={dateFormat} />
                            <Divider/>
                            <Row justify={"center"}>
                                   <Col span={20}>
                                       <p style={{margin: 1}}>Services: </p>
                                       <Select
                                           mode="multiple"
                                           allowClear
                                           style={{ width: '100%' }}
                                           placeholder="Please select"
                                           onChange={this.handleServiceSelector}
                                       >
                                           {children}
                                       </Select>
                                   </Col>
                            </Row>

                            <Row justify={"center"} style={{marginTop: 10}}>
                                <Col span={20}>
                                    <p style={{margin: 1}}>Staff: </p>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={this.handleEmployeeSelector}
                                    >
                                        {children}
                                    </Select>
                                </Col>
                            </Row>
                            {this.renderPriceList()}
                            <Row justify={"center"} style={{marginTop: 10}}>
                                <Col span={20}>
                                    <p style={{margin: 1}}>Total: </p>
                                    <InputNumber
                                        defaultValue={0}
                                        value={this.state.totalPrice}
                                        onChange={this.handleTotalPrice}
                                        formatter={
                                            value =>`$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        }
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Col>
                            </Row>
                            <Row justify={"center"}>
                                <Col>
                                    <Button onClick={this.onFinish} type={"primary"}>Submit</Button>
                                </Col>
                            </Row>
                            <Divider/>
                        </Card>
                    </Col>
                </Row>
                <Row justify={"center"} style={{marginTop: 10}}>
                    <Col>
                        <Card
                            style={{width: 1400}}
                            extra={
                                <Search placeholder="input search text" onSearch={this.onSearch()} style={{ width: 400 }} />
                            }
                            headStyle={{alignItems: "left"}}
                        >
                            <Table columns={columns} dataSource={data} />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(state =>({employeeList: state.employeeList}))(Sale);
