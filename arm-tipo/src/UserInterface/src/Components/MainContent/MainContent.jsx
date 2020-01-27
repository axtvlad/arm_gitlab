import {Breadcrumb, Layout} from "antd";
import React from "react";

const {Content} = Layout;

const MainContent = () => {
    return (
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0', textAlign: "left"}}>
                <Breadcrumb.Item>Основная база</Breadcrumb.Item>
                <Breadcrumb.Item>Приказы</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                Bill is a cat.
            </div>
        </Content>
    )
};
export default MainContent;