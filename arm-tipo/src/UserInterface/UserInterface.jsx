import React from 'react';
import './UserInterface.css';
import {Layout} from "antd";
import UserHeader from "./src/Components/UserHeader/UserHeader";
import NavBar from "./src/Components/Navbar/NavBar";
import MainContent from "./src/Components/MainContent/MainContent";

const UserInterface = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NavBar/>
            <Layout>
                <UserHeader/>
                <MainContent/>
            </Layout>
        </Layout>
    );
};

export default UserInterface;