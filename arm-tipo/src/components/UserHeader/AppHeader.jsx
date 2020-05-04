import React from 'react';
import {Button, Dropdown, Layout, Menu, Switch, Typography} from "antd";
import {AppstoreOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons"

const {Header} = Layout;
const {Text} = Typography;

const menu = (
    <Menu>
        <Menu.Item key="1">
            <UserOutlined/>
            Профиль
        </Menu.Item>
        <Menu.Item key="2">
            <SettingOutlined/>
            Настройки
        </Menu.Item>
        <Menu.Item key="3">
            <LogoutOutlined/>
            Выйти
        </Menu.Item>
    </Menu>
);

const AppHeader = (props) => {

    const setIsAdmin = (e) => {
        props.setIsAdmin(e);
    };

    return (
        <Header style={{background: '#fff', padding: 0}}>
            <span style={{float: 'left', marginLeft: 30}}>
                <Button danger>Помощь пользователю</Button>
                <Text style={{marginLeft: 30}}>Почта для запросов: </Text>
                <Text copyable>info@arm-tipo.kz</Text>
            </span>
            <span style={{float: 'right', marginRight: 30}}>
                <span style={{margin: '0 10px'}}>Пользователь</span>
                <Switch
                    style={{margin: '0 10px'}}
                    checked={props.isAdmin}
                    onClick={(e) => {setIsAdmin(e)}}
                />
                <span style={{marginRight: 20, marginLeft: 10}}>Администратор</span>
                <Dropdown.Button icon={<AppstoreOutlined/>} overlay={menu}>
                    Admin Admin
                </Dropdown.Button>
            </span>
        </Header>
    )
};

export default AppHeader;