import React, {Component, Fragment} from 'react';
import {Row, Card, Col, Table} from "antd";

class ProductSetting extends Component {
    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 50}} justify={"center"}>
                    <Col>
                        <Card style={{width: "calc(100vw * 0.5)"}}>
                            <Table>

                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default ProductSetting;
