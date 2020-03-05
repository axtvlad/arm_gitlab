import React from 'react';
import {Layout, Menu} from "antd"

const {Header, Content} = Layout;

const AdminInterface = (props) => {
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">База данных</Menu.Item>
                    <Menu.Item key="2">Пользователи</Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '50px', marginTop: 64, height: '100%'}}>
                <div style={{padding: 24, minHeight: 380, background: '#fff'}}>
                    Content
                </div>
            </Content>
        </Layout>
    );
};

export default AdminInterface;