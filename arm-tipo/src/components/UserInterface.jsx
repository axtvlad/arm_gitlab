import React from 'react';
import './Navbar/NavBar.module.css';
import {Layout} from "antd";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import NavBarContainer from "./Navbar/NavBarContainer";
import AppHeaderContainer from "./UserHeader/AppHeaderContainer";

const UserInterface = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NavBarContainer/>
            <Layout>
                <AppHeaderContainer/>
                <WorkSpace/>
            </Layout>
        </Layout>
    )
};

export default UserInterface;