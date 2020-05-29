import React from 'react'
import {connect} from "react-redux";
import {setIsAdmin} from "../../redux/Reducers/UserReducer";
import AppHeader from "./AppHeader";

class AppHeaderContainer extends React.Component {
    render() {
        return (
            <AppHeader {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        setIsAdmin
    }
)(AppHeaderContainer);