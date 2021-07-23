import React, {Component, Fragment} from 'react';
import {Row, Col, Card, List, Table} from "antd";
import appointmentData from "../../../../mock/appointment";
import server from "../../../../config/config";
import moment from "moment";
import axios from "axios";
class ItemListForProduct extends Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        let api = server.IP + "/dashboard/getProduct";
        let date = moment().format("YYYY-MM-DD")
        axios.post(api, {date}).then((result)=>{
            if(result.data.length > 0){
                let newData = result.data.map((item)=>({key: item.product_id, brand: item.brand, type: item.type, number: item.number, quantity: item.quantity}))
                this.setState({dataSource: newData})
            }
        }).catch(()=>{
            this.error()
        })
    }

    render() {

        const columns = [
            {
                title: 'Brand',
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Quantity',
                key: 'quantity',
                dataIndex: 'quantity',
            }
        ];
        return (
            <Fragment>
                <Table columns={columns} scroll={{ y: 300 }} pagination={false} dataSource={this.state.dataSource}/>
            </Fragment>
        );
    }
}

export default ItemListForProduct;
