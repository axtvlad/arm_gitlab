import React from 'react'
import {connect} from "react-redux";
import AppHeader from "./AppHeader";
import {logout} from "../../redux/reducers/AuthReducer";
import {selectLogin} from "../../redux/selectors/AuthSelector";

class AppHeaderContainer extends React.Component {
    render() {
        const {login, logout} = this.props

        return <AppHeader login={login} logout={logout}/>
    }
}

const mapStateToProps = (state) => {
    return {
        login: selectLogin(state),
    }
};

export default connect(mapStateToProps, {
    logout
})(AppHeaderContainer);