import React, {Component, Fragment} from 'react';
import {Row, Col, Card, List} from "antd";
import appointmentData from "../../../../mock/appointment";
class ItemList extends Component {
    render() {
        return (
            <Fragment>
                <List
                    dataSource={appointmentData}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}

export default ItemList;
