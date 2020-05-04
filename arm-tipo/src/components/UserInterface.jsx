import React from 'react';
import './Navbar/NavBar.module.css';
import {Layout} from "antd";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import HeaderContainer from "./UserHeader/AppHeaderContainer";
import NavBarContainer from "./Navbar/NavBarContainer";

const UserInterface = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NavBarContainer/>
            <Layout>
                <HeaderContainer/>
                <WorkSpace/>
            </Layout>
        </Layout>
    )
};

export default UserInterface;