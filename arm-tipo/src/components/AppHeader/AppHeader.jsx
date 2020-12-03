import React from 'react';
import {Affix, Button, Dropdown, Layout, Menu, Select, Typography} from "antd";
import {AppstoreOutlined, LogoutOutlined} from "@ant-design/icons"
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import classes from './AppHeader.module.css';

const AppHeader = ({setIsAuth, authDir}) => {
    const {Header} = Layout;
    const {Text} = Typography;
    const {Option} = Select;
    const {t, i18n} = useTranslation();

    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        setIsAuth(false);
    }

    const menu = (
        <Menu>
            {/*<Menu.Item key="1">
                <UserOutlined/>
                {t('profile')}
            </Menu.Item>
            <Menu.Item key="2">
                <SettingOutlined/>
                {t('settings')}
            </Menu.Item>*/}
            <Menu.Item key="3" onClick={logout}>
                <LogoutOutlined/>
                {t('logout')}
            </Menu.Item>
        </Menu>
    )

    const getUserName = () => {
        if (localStorage.user) {
            return JSON.parse(localStorage.getItem('user')).firstName;
        } else if (authDir.userData) {
            return authDir.userData.firstName
        }
    }

    const changeLocale = (e) => {
        console.log(e);
        i18n.changeLanguage(e);
    }

    return (
        <Affix offsetTop={0}>
            <Header className={classes.header}>
                <span className={classes.expert}>
                    <NavLink to={'/expert'}>
                        <Button danger>{t('help')}</Button>
                    </NavLink>
                    <Text className={classes.mailForRequest}>{t('mailForRequests')}</Text>
                    <Text copyable>info@arm-tipo.kz</Text>
                </span>
                {/*<Modal
                    title={t('help')}
                    visible={false}
                    onOk={() => {
                        alert('omg!')
                    }}
                >
                    <p>Скоро здесь появится инструкция</p>
                </Modal>*/}
                <Select
                    defaultValue={i18n.language}
                    onChange={changeLocale}
                    className={classes.localeSelect}
                >
                    <Option value="kz">kz</Option>
                    <Option value="ru">ru</Option>
                    {/*<Option value="en">en</Option>*/}
                </Select>
                <Dropdown.Button icon={<AppstoreOutlined/>} overlay={menu}>
                    {getUserName()}
                </Dropdown.Button>
            </Header>
        </Affix>
    )
};

export default AppHeader;