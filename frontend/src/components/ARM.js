import React from 'react';
import {Affix, Layout} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";
import NavBarContainer from "../components/Navbar/NavBarContainer";
import AppHeaderContainer from "../components/AppHeader/AppHeaderContainer";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import {initializeApp} from "../redux/reducers/appReducer";
import {isAuthRedirect} from "../hoc/isAuthRedirect";

const {Footer} = Layout;

class ARM extends React.Component {
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <NavBarContainer/>
                <Layout>
                    <AppHeaderContainer/>
                    <WorkSpace/>
                    <Affix offsetBottom={0}>
                        <Footer style={{textAlign: 'center'}}>ARM-TIPO ©2020 Created by Axt Vladislav</Footer>
                    </Affix>
                </Layout>
            </Layout>
        )
    }
}

export default compose(
    isAuthRedirect,
    connect(null, {
        initializeApp
    })
)(ARM);