import React from 'react';
import './Navbar/NavBar.module.css';
import {Layout} from "antd";
import UserHeader from "../components/UserHeader/UserHeader";
import NavBar from "../components/Navbar/NavBar";
import WorkSpace from "../components/WorkSpace/WorkSpace";

const UserInterface = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NavBar/>
            <Layout>
                <UserHeader/>
                <WorkSpace/>
            </Layout>
        </Layout>
    )
};

export default UserInterface;