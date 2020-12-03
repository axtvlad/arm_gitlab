import React from 'react';
import './Navbar/NavBar.module.css';
import {Layout, Spin} from "antd";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import NavBarContainer from "./Navbar/NavBarContainer";
import AppHeaderContainer from "./AppHeader/AppHeaderContainer";
import {connect} from "react-redux";
import {setIsAuth, setUserData} from "../redux/Reducers/AuthReducer";
import AuthContainer from "./Auth/AuthContainer";

class UserInterface extends React.Component {
    componentDidMount() {
        const {authDir, setUserData, setIsAuth} = this.props;

        if (!authDir.isAuth) {
            if (localStorage.isAuth &&
                localStorage.isAuth === 'true') {

                setIsAuth(
                    JSON.parse(localStorage.getItem('isAuth'))
                )

                setUserData(
                    JSON.parse(localStorage.getItem('user'))
                )
            }
        }

        if (!authDir.userData && localStorage.user) {
            setUserData(
                JSON.parse(localStorage.getItem('user'))
            )
        }
    }

    render() {
        const {authDir, setIsAuth} = this.props;

        if (!authDir.isAuth) {
            return <AuthContainer/>
        } else if (authDir.authInProcess && authDir.userData.firstName) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
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