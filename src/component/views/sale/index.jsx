import React, {Component, Fragment} from 'react';
import {
    Tag, Space, Table, Button, DatePicker, Col, Card, Row,
    Divider, Form, Input, InputNumber, Select, message
} from "antd";
import moment from 'moment';
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import server from "../../../config/config";
import {addSaleRecord, setSaleRecord} from "../../../redux/action/index"
import {connect} from "react-redux";
const { Option } = Select;
const { Search } = Input;



const dateFormat = 'YYYY-MM-DD';

const columns = [
    {
        title: 'services',
        dataIndex: 'services',
        key: 'services',
    },
    {
        title: 'employees',
        dataIndex: 'employees',
        key: 'employees',
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
        title: 'price',
        dataIndex: 'price',
        key: 'price',
    }
];


class Sale extends Component {
    state = {
        employees: [],
        services:[],
        priceList:[],
        employeeIdList:[],
        serviceIdList:[],
        date: "",
        searchDate: "",
        totalPrice: 0,
    }

    componentDidMount() {
        let date = moment().format("YYYY-MM-DD")
        this.setState({
                date: date,
                searchDate: date
            })
        let api = server.IP + "/sale/getSaleRecord";
        axios.get(api, {params:{ date: date}}).then((result)=>{
            const record = {record: result.data}
            this.props.setSaleRecord(record)
        }).catch(()=>{
            this.error()
        })
    }

    onSearch  = () =>{

    }


    onFinish = ()=>{
        let id = uuidv4()
        let time = moment().format("HH:mm")
        const saleRecord = {
            saleId: id,
            employees: this.state.employees,
            employeeIdList: this.state.employeeIdList,
            services: this.state.services,
            serviceIdList: this.state.serviceIdList,
            priceList: this.state.priceList,
            totalPrice: this.state.totalPrice,
            date: this.state.date,
            time: time
        }
        let api = server.IP + "/sale/addSaleRecord";
        axios.post(api, {saleRecord}).then((result)=>{
            const services = this.convertToString(this.state.services)
            const employees = this.convertToString(this.state.employees)
           const newSaleRecord = {
               sale_id: id,
               employees: employees,
               services: services,
               price: this.state.totalPrice,
               date: this.state.date,
               time: time
           }
           this.props.addSaleRecord(newSaleRecord)
            this.success()
        }).catch(()=>{
            this.error()
        })
    }

    convertToString = (arr) => {
        let result  = ""
        for(let i = 0; i < arr.length; i++){
            result += arr[i]
            if(i !== arr.length - 1){
                result +=" "
            }
        }
        return result
    }

    success = () => {
        message.success('Success');
    }

    error = () => {
        message.error('Fail');
    };

    handleTotalPrice = (value) =>{
        console.log(value)
        this.setState({totalPrice: value})
    }
    handleDatePicker = (date, dateString) =>{
        this.setState({date: dateString})
    }

    handleSaleDatePicker = (date, dateString) =>{
        this.setState({searchDate: dateString},()=>{
            let api = server.IP + "/sale/getSaleRecord";
            axios.get(api, {params:{ date: dateString}}).then((result)=>{
                const record = {record: result.data}
                this.props.setSaleRecord(record)
            }).catch((result)=>{
                console.log(result)
                this.error()
            })
        })
    }

    handleServiceSelector = (value)=>{
        let idList = [];
        for(let i = 0; i < value.length; i++){
            let serviceName = value[i]
            let target = this.props.serviceList.list.filter((services)=>{
                return services.service === serviceName
            })
            idList.push(target[0].serviceId)
        }
        this.setState({services: value, serviceIdList: idList})
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
        let idList = [];
        for(let i = 0; i < value.length; i++){
            let name = value[i]
            let target = this.props.employeeList.list.filter((employee)=>{
                console.log(employee)
                return employee.employee_name === name
            })
            idList.push(target[0].employee_id)
        }
        this.setState({employees: value, employeeIdList: idList})
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
        const employeeSelection = [];
        const serviceSelection = [];
        const data= this.props.saleRecord.record.map(item=>({key: item.sale_id, employees: item.employees, services: item.services, price: item.price, date: item.date, time: item.time}));
        for (let i = 0; i < this.props.employeeList.list.length; i++) {
            employeeSelection.push(<Option key={this.props.employeeList.list[i].employee_name} >{this.props.employeeList.list[i].employee_name}</Option>);
        }

        for (let i = 0; i < this.props.serviceList.list.length; i++) {
            serviceSelection.push(<Option key={this.props.serviceList.list[i].service}>{this.props.serviceList.list[i].service}</Option>);
        }


        return (
            <Fragment>
                <Row justify={"center"} style={{ marginTop: 50}}>
                    <Col>
                        <Card
                            style={{width: "calc(100vw * 0.5)"}}
                        >
                            <p style={{marginRight: 30, marginBottom: 5}}>Date:</p>
                            <DatePicker onChange={this.handleDatePicker} style={{width: 200}} value={moment(this.state.date)} format={dateFormat} />
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
                                           {serviceSelection}
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
                                        {employeeSelection}
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
                                <div>
                                    <Search placeholder="input search text" onSearch={this.onSearch()} style={{ width: 400, marginRight: 750 }} />
                                    <DatePicker onChange={this.handleSaleDatePicker} style={{width: 200}} value={moment(this.state.searchDate)} format={dateFormat} />
                                </div>

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

export default connect(
    state =>({employeeList: state.employee, serviceList: state.service, saleRecord: state.sale}),
    {setSaleRecord: setSaleRecord, addSaleRecord: addSaleRecord}
    )(Sale);
