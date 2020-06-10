import React from 'react';
import {Affix, Button, Dropdown, Layout, Menu, Modal, Select, Typography} from "antd";
import {AppstoreOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons"
import {useTranslation} from "react-i18next";

const {Header} = Layout;
const {Text} = Typography;
const {Option} = Select;

const AppHeader = (props) => {
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
            <Menu.Item key="3" onClick={() => {
                localStorage.removeItem('isAuth');
                localStorage.removeItem('user');
                props.setIsAuth(false);
            }}>
                <LogoutOutlined/>
                {t('logout')}
            </Menu.Item>
        </Menu>
    );

    const getUserName = () => {
        if (localStorage.user) {
           return JSON.parse(localStorage.getItem('user')).firstName;
        } else if (props.authDir.userData) {
            return props.authDir.userData.firstName
        } else {
            return 'No NAME'
        }
    }

    const changeLocale = (e) => {
        console.log(e);
        i18n.changeLanguage(e);
    };

    return (
        <Affix offsetTop={0}>
            <Header style={{background: '#fff', padding: 0}}>
                <span style={{float: 'left', marginLeft: 30}}>
                    <Button danger>{t('help')}</Button>
                    <Text style={{marginLeft: 30}}>{t('mailForRequests')}</Text>
                    <Text copyable>info@arm-tipo.kz</Text>
                </span>
                <Modal
                    title={t('help')}
                    visible={false}
                    onOk={() => {
                        alert('omg!')
                    }}
                >
                    <p>Скоро здесь появится инструкция</p>
                </Modal>
                <Select
                    defaultValue={i18n.language}
                    style={{width: '100px'}}
                    onChange={(e) => changeLocale(e)}
                >
                    <Option value="ru">ru</Option>
                    {/*<Option value="en">en</Option>*/}
                    <Option value="kz">kz</Option>
                </Select>
                <Dropdown.Button icon={<AppstoreOutlined/>} overlay={menu}>
                    {getUserName()}
                </Dropdown.Button>
            </Header>
        </Affix>
    )
};

export default AppHeader;