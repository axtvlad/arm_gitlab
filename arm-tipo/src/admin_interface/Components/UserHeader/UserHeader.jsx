import React from 'react';
import {Col, Dropdown, Input, Layout, Menu, Row} from "antd";
import classes from './UserHeader.module.css';
import {UserOutlined, SettingOutlined, LogoutOutlined, AppstoreOutlined} from "@ant-design/icons"

const {Header} = Layout;
const {Search} = Input;

const user = (
    <Menu>
        <Menu.Item key="1">
            <UserOutlined />
            Профиль
        </Menu.Item>
        <Menu.Item key="2">
            <SettingOutlined />
            Настройки
        </Menu.Item>
        <Menu.Item key="3">
            <LogoutOutlined />
            Выйти
        </Menu.Item>
    </Menu>
);

const UserHeader = (props) => {
    return (
        <Header style={{background: '#fff', padding: 0}}>
            <Row type="flex" justify="space-around">
                <Col span={20} className={classes.search}>
                    <Search
                        style={{width: '50%'}}
                        placeholder="Введите текст для поиска"
                        enterButton
                        onSearch={value => console.log(value)}
                    />
                </Col>
                <Col span={4}>
                    <Dropdown.Button icon={<AppstoreOutlined />} overlay={user}>
                        Admin Admin
                    </Dropdown.Button>
                </Col>
            </Row>
        </Header>
    )
}

export default UserHeader;