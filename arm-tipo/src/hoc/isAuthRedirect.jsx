import React from 'react';
import {Redirect} from "react-router-dom";

export const isAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            const {isAuth} = this.props;

            if (!isAuth) return <Redirect to={'/login'}/>;

            return <Component {...this.props} />
        }
    }

    return RedirectComponent;
};


