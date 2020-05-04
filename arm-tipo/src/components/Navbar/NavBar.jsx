import {Layout, Menu} from "antd";
import React from "react";
import {DatabaseOutlined, FileOutlined, FormOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons';
import classes from './NavBar.module.css'
import {NavLink} from "react-router-dom";
import CodeSandboxOutlined from "@ant-design/icons/lib/icons/CodeSandboxOutlined";
import ReadOutlined from "@ant-design/icons/lib/icons/ReadOutlined";
import {useTranslation} from 'react-i18next';

const {Sider} = Layout;
const {SubMenu} = Menu;

const NavBar = (props) => {
    const {t} = useTranslation();
    return (
        <Sider collapsible>
            <div className={classes.logo}>
                <img src={require('./w.png')} alt="logo"/>
            </div>
            <Menu
                className={classes.menu}
                defaultSelectedKeys={['1']}
                mode="inline"
                theme={'dark'}
            >
                <Menu.Item key={'1'}>
                    <NavLink to={'/'}>
                        <span>
                            <HomeOutlined/>
                            <span>Главная</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={'33'}>
                    <NavLink to={'/mainDocs'}>
                        <span>
                           <DatabaseOutlined/>
                           <span>Основная база</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <SubMenu
                    key={'sub1'}
                    title={
                        <span>
                            <FileOutlined/>
                            <span>Прочие документы</span>
                        </span>
                    }
                >
                    <Menu.Item key={'3'}>
                        <NavLink to={'/maps'}>
                            <span>Карты развития</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key={'4'}>
                    <NavLink to={'/templates'}>
                        <span>
                            <FormOutlined/>
                            <span>Шаблоны</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <SubMenu
                    key={'sub3'}
                    title={
                        <span>
                            <TeamOutlined/>
                            <span>{t('Experts')}</span>
                        </span>
                    }
                >
                    <Menu.Item key={'6'}>
                        <NavLink to={'/expert'}>
                            <span>Эксперт 1</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key={'sub4'}
                    title={
                        <span>
                            <CodeSandboxOutlined/>
                            <span>Справочники</span>
                        </span>
                    }
                >
                    <Menu.Item key={'7'}>
                        <NavLink to={'/types'}>
                            <span>Типы документов</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'8'}>
                        <NavLink to={'/departments'}>
                            <span>Отделы</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'9'}>
                        <NavLink to={'/statuses'}>
                            <span>Статусы</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'10'}>
                        <NavLink to={'/roles'}>
                            <span>Роли пользователей</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'11'}>
                        <NavLink to={'/customers'}>
                            <span>Клиенты</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'12'}>
                        <NavLink to={'/categories'}>
                            <span>Категории</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'13'}>
                        <NavLink to={'/cities'}>
                            <span>Города</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key={'14'}>
                    <NavLink to={'/faqs'}>
                        <ReadOutlined/>
                        <span>FAQ</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
};

export default NavBar;