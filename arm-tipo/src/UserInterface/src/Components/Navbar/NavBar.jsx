import {Icon, Layout, Menu} from "antd";
import React from "react";

const {Sider} = Layout;
const {SubMenu} = Menu;

const NavBar = () => {
    return (
        <Sider collapsible>
            <div className={'logo'}>
                <img src={require('./w.png')} alt="logo"/>
            </div>
            <Menu
                style={{textAlign: "left"}}
                defaultSelectedKeys={['1']}
                mode="inline"
                theme={'dark'}
            >
                <Menu.Item key={'1'}>
                    <span>
                        <Icon type={'home'}/>
                        <span>Главная</span>
                    </span>
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
                    <Menu.Item key={'2'}>Приказы</Menu.Item>
                    <Menu.Item key={'3'}>Постановления</Menu.Item>
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
                    <Menu.Item key="4">Карты развития</Menu.Item>
                </SubMenu>
                <Menu.Item key={'5'}>
                    <span>
                        <Icon type={'form'}/>
                        <span>Шаблоны</span>
                    </span>
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
                    <Menu.Item key={'6'}>Эксперт 1</Menu.Item>
                    <Menu.Item key={'7'}>Эксперт 2</Menu.Item>
                    <Menu.Item key={'8'}>Эксперт 3</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
};

export default NavBar;