import {Layout, Menu} from "antd";
import React from "react";
import {DatabaseOutlined, FileOutlined, FormOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons';
import classes from './NavBar.module.css'
import {NavLink} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;

const NavBar = (props) => {
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
                    <NavLink to={'/home'}>
                            <span>
                                <HomeOutlined/>
                                <span>Главная</span>
                            </span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={'33'}>
                    <NavLink to={'/base'}>
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
                    <NavLink to={'templates'}>
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
                            <span>Эксперты</span>
                        </span>
                    }
                >
                    <Menu.Item key={'6'}>
                        <NavLink to={'/expert'}>
                            <span>Эксперт 1</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
};

export default NavBar;