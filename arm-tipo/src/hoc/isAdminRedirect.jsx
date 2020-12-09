import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        isAdmin: state.authDir.userData.isAdmin
    }
}

export const isAdminRedirect = (WrappedComponent) => {
    class RedirectComponent extends React.Component {
        render() {
            const {isAdmin} = this.props

            if (!isAdmin) {
                return <Redirect to={'/home'}/>
            }

            return <WrappedComponent {...this.props} />
        }
    }

    return connect(mapStateToProps, null)(RedirectComponent)
};



