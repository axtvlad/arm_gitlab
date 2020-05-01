import React from 'react';
import './Components/Navbar/NavBar.module.css';
import {Layout} from "antd";
import UserHeader from "./Components/UserHeader/UserHeader";
import NavBar from "./Components/Navbar/NavBar";
import WorkSpace from "./Components/WorkSpace/WorkSpace";

class UserInterface extends React.Component {
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <NavBar/>
                <Layout>
                    <UserHeader/>
                    <WorkSpace/>
                </Layout>
            </Layout>
        )
    }
}

export default UserInterface;