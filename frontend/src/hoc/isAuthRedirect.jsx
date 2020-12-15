import React from 'react';
import {connect} from "react-redux";
import AuthContainer from "../components/Auth/AuthContainer";

const mapStateToProps = (state) => {
    return {
        isAuth: state.authDir.isAuth
    }
}

export const isAuthRedirect = (WrappedComponent) => {
    class RedirectComponent extends React.Component {
        render() {
            const {isAuth, ...restProps} = this.props

            if (!isAuth) {
                return <AuthContainer/>
            }

            return <WrappedComponent {...restProps} />
        }
    }

    return connect(mapStateToProps)(RedirectComponent)
};



