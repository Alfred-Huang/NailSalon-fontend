import React, {Component, Fragment} from 'react';
import {List, Col, Card, Row, Button, Calendar} from "antd";

const data = ["a", "b", "c"]

class Manage extends Component {
    render() {
        return (
            <Fragment>
                <Row justify={"center"} style={{marginTop: 50}}>
                    <Col offset={1}>
                        <Card
                            title={"Employee Manage"}
                        >
                            <List
                                bordered
                                dataSource={data}
                                renderItem=
                                    {item =>
                                        <List.Item>
                                            <div>
                                                {item}
                                            </div>
                                            <div style={{textAlign: "right"}}>
                                                <Button style={{marginLeft: 40}}>as</Button>
                                            </div>
                                        </List.Item>
                                    }
                            />
                        </Card>
                    </Col>
                    <Col offset={3}>
                        <Calendar mode="month" style={{width: "calc(100vw * 0.5)"}} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Manage;
