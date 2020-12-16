import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {selectIsAdmin} from "../redux/selectors/AuthSelector";

const mapStateToProps = (state) => {
    return {
        isAdmin: selectIsAdmin(state)
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



