import React from 'react'
import {connect} from "react-redux";
import AppHeader from "./AppHeader";
import {authActions} from "../../redux/reducers/AuthReducer";

class AppHeaderContainer extends React.Component {
    render() {
        const {authDir, setIsAuth} = this.props

        return <AppHeader authDir={authDir} setIsAuth={setIsAuth}/>
    }
}

const mapStateToProps = (state) => {
    return {
        authDir: state.usersDir,
    }
};

export default connect(mapStateToProps, {
    setIsAuth: authActions.setIsAuth
})(AppHeaderContainer);