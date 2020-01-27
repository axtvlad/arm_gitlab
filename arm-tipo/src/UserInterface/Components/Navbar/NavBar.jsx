import {Icon, Layout, Menu} from "antd";
import React from "react";
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
                            <Icon type={'home'}/>
                            <span>Главная</span>
                        </span>
                    </a>
                </Menu.Item>
                <SubMenu
                    key={'sub1'}
                    title={
                        <span>
                            <Icon type={'file-protect'}/>
                            <span>Основная база</span>
                        </span>
                    }
                >
                    <Menu.Item key={'2'}>
                        <a href={'/orders'}>
                            <span>Приказы</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key={'3'}>
                        <a href={'/regulations'}>
                            <span>Постановления</span>
                        </a>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key={'sub2'}
                    title={
                        <span>
                            <Icon type={'file'}/>
                            <span>Прочие документы</span>
                        </span>
                    }
                >
                    <Menu.Item key={'4'}>
                        <a href={'/maps'}>
                            <span>Карты развития</span>
                        </a>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key={'5'}>
                    <a href={'/templates'}>
                        <span>
                            <Icon type={'form'}/>
                            <span>Шаблоны</span>
                        </span>
                    </a>
                </Menu.Item>
                <SubMenu
                    key={'sub3'}
                    title={
                        <span>
                            <Icon type={'team'}/>
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