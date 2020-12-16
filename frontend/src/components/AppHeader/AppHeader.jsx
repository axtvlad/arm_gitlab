import React from 'react';
import {Affix, Button, Col, Dropdown, Layout, Menu, Row, Select, Typography} from "antd";
import {AppstoreOutlined, LogoutOutlined} from "@ant-design/icons"
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import classes from './AppHeader.module.css';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";

const AppHeader = ({logout, login}) => {
    const {Header} = Layout;
    const {Text} = Typography;
    const {Option} = Select;
    const {t, i18n} = useTranslation();

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <UserOutlined/>
                {t('profile')}
            </Menu.Item>
            <Menu.Item key="2">
                <SettingOutlined/>
                {t('settings')}
            </Menu.Item>
            <Menu.Item key="3" onClick={() => logout()}>
                <LogoutOutlined/>
                {t('logout')}
            </Menu.Item>
        </Menu>
    )

    const changeLocale = (e) => {
        i18n.changeLanguage(e);
    }

    return (
        <Affix offsetTop={0}>
            <Header className={classes.header} style={{backgroundColor: '#fff'}}>
                <Row>
                    <Col span={20}>
                        <NavLink to={'/expert'}>
                            <Button danger>{t('help')}</Button>
                        </NavLink>
                        <Text className={classes.mailForRequest}>{t('mailForRequests')}</Text>
                        <Text copyable>info@arm-tipo.kz</Text>
                    </Col>
                    <Col span={2}>
                        <Select
                            defaultValue={i18n.language}
                            onChange={changeLocale}
                            className={classes.localeSelect}
                        >
                            <Option value="kz">kz</Option>
                            <Option value="ru">ru</Option>
                            <Option value="en">en</Option>
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Dropdown.Button icon={<AppstoreOutlined/>} overlay={menu}>
                            {login}
                        </Dropdown.Button>
                    </Col>
                </Row>
            </Header>
        </Affix>
    )
};

export default AppHeader;