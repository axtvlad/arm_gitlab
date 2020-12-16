import {Affix, Layout, Menu} from "antd";
import React from "react";
import {DatabaseOutlined, FormOutlined, HomeOutlined} from '@ant-design/icons';
import classes from './NavBar.module.css'
import {NavLink, useHistory} from "react-router-dom";
import CodeSandboxOutlined from "@ant-design/icons/lib/icons/CodeSandboxOutlined";
import ReadOutlined from "@ant-design/icons/lib/icons/ReadOutlined";
import {useTranslation} from 'react-i18next';
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import logo from './w.png'

const NavBar = ({isAdmin}) => {
    const {Sider} = Layout;
    const {SubMenu} = Menu;
    const {t} = useTranslation();
    const {location} = useHistory();

    return (
        <Affix>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                }}
            >
                <div className={classes.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <Menu
                    className={classes.menu}
                    defaultSelectedKeys={[location.pathname]}
                    mode="inline"
                    theme={'dark'}
                >
                    <Menu.Item key={'/search'}>
                        <NavLink to={'/search'}>
                        <span>
                            <SearchOutlined/>
                            <span>{t('search')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/home'}>
                        <NavLink to={'/home'}>
                        <span>
                            <HomeOutlined/>
                            <span>{t('home')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/mainDocs'}>
                        <NavLink to={'/mainDocs'}>
                        <span>
                           <DatabaseOutlined/>
                           <span>{t('mainDocs')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/otherDocs'}>
                        <NavLink to={'/otherDocs'}>
                        <span>
                           <DatabaseOutlined/>
                           <span>{t('otherDocs')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/templates'}>
                        <NavLink to={'/templates'}>
                        <span>
                            <FormOutlined/>
                            <span>{t('templates')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/expert'}>
                        <NavLink to={'/expert'}>
                        <span>
                            <FormOutlined/>
                            <span>{t('experts')}</span>
                        </span>
                        </NavLink>
                    </Menu.Item>
                    {isAdmin && (
                        <SubMenu
                            key={'/directories'}
                            title={
                                <>
                                    <CodeSandboxOutlined/>
                                    {t('directories')}
                                </>
                            }
                        >
                            <Menu.Item key={'/types'}>
                                <NavLink to={'/types'}>
                                    {t('docTypes')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/departments'}>
                                <NavLink to={'/departments'}>
                                    {t('departments')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/statuses'}>
                                <NavLink to={'/statuses'}>
                                    {t('statuses')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/roles'}>
                                <NavLink to={'/roles'}>
                                    {t('roles')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/customers'}>
                                <NavLink to={'/customers'}>
                                    {t('customers')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/categories'}>
                                <NavLink to={'/categories'}>
                                    {t('categories')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/cities'}>
                                <NavLink to={'/cities'}>
                                    {t('cities')}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/genders'}>
                                <NavLink to={'/genders'}>
                                    {t('genders')}
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    )}
                    <Menu.Item key={'/faqs'}>
                        <NavLink to={'/faqs'}>
                            <ReadOutlined/>
                            {t('faqs')}
                        </NavLink>
                    </Menu.Item>
                    {isAdmin && (
                        <Menu.Item key={'/users'}>
                            <NavLink to={'/users'}>
                                <ReadOutlined/>
                                {t('users')}
                            </NavLink>
                        </Menu.Item>
                    )}
                    <Menu.Item key={'/workPlanSchedule'}>
                        <NavLink to={'/workPlanSchedule'}>
                            <FormOutlined/>
                            РУП ВТиПО 2020
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Affix>
    )
};

export default NavBar;