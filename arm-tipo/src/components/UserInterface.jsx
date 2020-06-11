import React from 'react';
import './Navbar/NavBar.module.css';
import {Layout, Spin} from "antd";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import NavBarContainer from "./Navbar/NavBarContainer";
import AppHeaderContainer from "./AppHeader/AppHeaderContainer";
import {connect} from "react-redux";
import {setIsAuth, setUserData} from "../redux/Reducers/AuthReducer";
import AuthContainer from "./Auth/AuthContainer";
import {Route} from "react-router-dom";
import AddStatusContainer from "./WorkSpace/Directories/Statuses/AddStatusContainer";

class UserInterface extends React.Component {
    componentDidMount() {
        if (!this.props.authDir.isAuth) {
            if (localStorage.isAuth &&
                localStorage.isAuth === 'true') {

                this.props.setIsAuth(
                    JSON.parse(localStorage.getItem('isAuth'))
                )

                this.props.setUserData(
                    JSON.parse(localStorage.getItem('user'))
                )
            }
        }

        if (!this.props.authDir.userData && localStorage.user) {
            this.props.setUserData(
                JSON.parse(localStorage.getItem('user'))
            )
        }
    }

    render() {
        if (!this.props.authDir.isAuth) {
            return <AuthContainer/>
        } else if (this.props.authDir.authInProcess && this.props.authDir.userData.firstName) {
            return <Spin/>
        } else {
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <NavBarContainer/>
                    <Layout>
                        <AppHeaderContainer setIsAuth={this.props.setIsAuth}/>
                        <WorkSpace/>
                    </Layout>
                </Layout>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        authDir: state.authDir
    }
};

export default connect(mapStateToProps,
    {
        setUserData,
        setIsAuth
    }
)(UserInterface);