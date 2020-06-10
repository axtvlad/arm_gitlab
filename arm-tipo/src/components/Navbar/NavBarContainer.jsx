import React from 'react'
import {connect} from "react-redux";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAdmin: state.authDir.userData.isAdmin,
    }
};

export default connect(mapStateToProps, null)(NavBarContainer);