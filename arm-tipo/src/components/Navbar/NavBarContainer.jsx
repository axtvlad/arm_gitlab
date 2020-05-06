import React from 'react'
import {connect} from "react-redux";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar isAdmin={this.props.isAdmin}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    null
)(NavBarContainer);