import {Layout, Menu} from "antd";
import React from "react";
import {DatabaseOutlined, FileOutlined, FormOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons';
import classes from './NavBar.module.css'
import {NavLink} from "react-router-dom";
import CodeSandboxOutlined from "@ant-design/icons/lib/icons/CodeSandboxOutlined";
import ReadOutlined from "@ant-design/icons/lib/icons/ReadOutlined";
import {useTranslation} from 'react-i18next';
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";

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
                <Menu.Item key={'21'}>
                    <NavLink to={'/search'}>
                        <span>
                            <SearchOutlined/>
                            <span>{t('search')}</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={'1'}>
                    <NavLink to={'/'}>
                        <span>
                            <HomeOutlined/>
                            <span>{t('home')}</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={'33'}>
                    <NavLink to={'/mainDocs'}>
                        <span>
                           <DatabaseOutlined/>
                           <span>{t('mainDocs')}</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <SubMenu
                    key={'sub1'}
                    title={
                        <span>
                            <FileOutlined/>
                            <span>{t('otherDocs')}</span>
                        </span>
                    }
                >
                    <Menu.Item key={'3'}>
                        <NavLink to={'/maps'}>
                            <span>{t('maps')}</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key={'4'}>
                    <NavLink to={'/templates'}>
                        <span>
                            <FormOutlined/>
                            <span>{t('templates')}</span>
                        </span>
                    </NavLink>
                </Menu.Item>
                <SubMenu
                    key={'sub3'}
                    title={
                        <span>
                            <TeamOutlined/>
                            <span>{t('experts')}</span>
                        </span>
                    }
                >
                    <Menu.Item key={'6'}>
                        <NavLink to={'/expert'}>
                            <span>Эксперт 1</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                {props.isAdmin && (
                    <SubMenu
                        key={'sub4'}
                        title={
                            <span>
                                <CodeSandboxOutlined/>
                                <span>{t('directories')}</span>
                            </span>
                        }
                    >
                        <Menu.Item key={'7'}>
                            <NavLink to={'/types'}>
                                <span>{t('docTypes')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'8'}>
                            <NavLink to={'/departments'}>
                                <span>{t('departments')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'9'}>
                            <NavLink to={'/statuses'}>
                                <span>{t('statuses')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'10'}>
                            <NavLink to={'/roles'}>
                                <span>{t('roles')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'11'}>
                            <NavLink to={'/customers'}>
                                <span>{t('customers')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'12'}>
                            <NavLink to={'/categories'}>
                                <span>{t('categories')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'13'}>
                            <NavLink to={'/cities'}>
                                <span>{t('cities')}</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={'14'}>
                            <NavLink to={'/genders'}>
                                <span>{t('genders')}</span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                )}
                <Menu.Item key={'15'}>
                    <NavLink to={'/faqs'}>
                        <ReadOutlined/>
                        <span>{t('faqs')}</span>
                    </NavLink>
                </Menu.Item>
                {props.isAdmin && (
                    <Menu.Item key={'16'}>
                        <NavLink to={'/users'}>
                            <ReadOutlined/>
                            <span>{t('users')}</span>
                        </NavLink>
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    )
};

export default NavBar;