import {Layout, Menu} from "antd";
import React from "react";
import {DatabaseOutlined, FileOutlined, FormOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons';
import classes from './NavBar.module.css'

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
                    <a href={'/home'}>
                        <span>
                            <HomeOutlined/>
                            <span>Главная</span>
                        </span>
                    </a>
                </Menu.Item>
                <Menu.Item key={'33'}>
                    <a href={'/base'}>
                        <span>
                           <DatabaseOutlined/>
                            <span>Основная база</span>
                        </span>
                    </a>
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
                        <a href={'/maps'}>
                            <span>Карты развития</span>
                        </a>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key={'4'}>
                    <a href={'/templates'}>
                        <span>
                            <FormOutlined/>
                            <span>Шаблоны</span>
                        </span>
                    </a>
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
                        <a href={'/expert/1'}>
                            <span>Эксперт 1</span>
                        </a>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
};

export default NavBar;