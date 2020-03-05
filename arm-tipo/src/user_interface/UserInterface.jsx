import React from 'react';
import './Components/Navbar/NavBar.module.css';
import {Layout} from "antd";
import UserHeader from "./Components/UserHeader/UserHeader";
import NavBar from "./Components/Navbar/NavBar";
import WorkSpace from "./Components/WorkSpace/WorkSpace";

const UserInterface = (props) => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NavBar/>
            <Layout>
                <UserHeader/>
                <WorkSpace state={props.state}/>
            </Layout>
        </Layout>
    );
};

export default UserInterface;