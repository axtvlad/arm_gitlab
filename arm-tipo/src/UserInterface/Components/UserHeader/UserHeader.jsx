import React from 'react';
import {Col, Dropdown, Icon, Input, Layout, Menu, Row} from "antd";
import classes from './UserHeader.module.css';

const {Header} = Layout;
const {Search} = Input;

const user = (
    <Menu>
        <Menu.Item key="1">
            <Icon type="user"/>
            Профиль
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="setting"/>
            Настройки
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="logout"/>
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
                    <Dropdown.Button icon={<Icon type="appstore"/>} overlay={user}>
                        Admin Admin
                    </Dropdown.Button>
                </Col>
            </Row>
        </Header>
    )
}

export default UserHeader;