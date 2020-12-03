import React from 'react'
import {connect} from "react-redux";
import Auth from "./Auth";
import {postAuthUserData, updateAuthLogin, updateAuthPassword} from "../../redux/Reducers/AuthReducer";

class AuthContainer extends React.Component {
    render() {
        return (
            <Auth {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authDir: state.authDir
    }
};

export default connect(mapStateToProps,
    {
        postAuthUserData,
        updateAuthLogin,
        updateAuthPassword
    }
)(AuthContainer);