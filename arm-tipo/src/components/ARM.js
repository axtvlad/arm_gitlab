import React from 'react';
import {Layout} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";
import {setIsAuth, setUserData} from "../redux/Reducers/AuthReducer";
import NavBarContainer from "../components/Navbar/NavBarContainer";
import AppHeaderContainer from "../components/AppHeader/AppHeaderContainer";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import {initializeApp} from "../redux/Reducers/appReducer";
import {isAuthRedirect} from "../hoc/isAuthRedirect";

class ARM extends React.Component {
    render() {
        const {setIsAuth} = this.props;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <NavBarContainer/>
                <Layout>
                    <AppHeaderContainer setIsAuth={setIsAuth}/>
                    <WorkSpace/>
                </Layout>
            </Layout>
        )
    }
}

export default compose(
    isAuthRedirect,
    connect(null, {
        setUserData,
        setIsAuth,
        initializeApp
    })
)(ARM);