import React from 'react'
import {connect} from "react-redux";
import AppHeader from "./AppHeader";
import {setIsAuth} from "../../redux/Reducers/AuthReducer";

class AppHeaderContainer extends React.Component {
    render() {
        return (
            <AppHeader {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authDir: state.usersDir,
    }
};

export default connect(mapStateToProps,
    setIsAuth
)(AppHeaderContainer);