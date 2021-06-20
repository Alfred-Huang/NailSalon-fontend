import React, {Component, Fragment} from 'react';
import {Input, Row, Col, Card, Button, Tag, Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;
const tagsData = ['Movies', 'Books', 'Music', 'Sports'];
class Products extends Component {

    state = {
        selectedTags: ['Books'],
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }
    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 30}}>
                    <Col offset={1}>
                        <Card style={{width: "calc(100vw - 350px)"}}>
                            <Input style={{width: 200}} placeholder="Search brand or number" />
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: 5}}>
                    <Col offset={1}>
                        <div style={{width: "calc(100vw - 350px)", height: 40, display: "inline-block", backgroundColor: "white", textAlign: "center"}}>
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
                        <Button type="dashed" style={{width: 100, height: 150}} icon={<PlusOutlined style={{fontSize: 45}} />}/>
                    </Col>
                    <Modal>

                    </Modal>
                </Row>
            </Fragment>
        );
    }
}

export default Products;
