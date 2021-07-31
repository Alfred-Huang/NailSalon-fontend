import React  from "react";
import { Spin } from "antd";

const Loading = () => {

    return (
        <div style={{marginTop: 400, marginLeft: 700}}>
            <Spin size="large"/>
        </div>
    );
};

export default Loading;
