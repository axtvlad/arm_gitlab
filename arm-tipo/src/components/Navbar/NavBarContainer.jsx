import React from 'react'
import {connect} from "react-redux";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
    render() {
        const {isAdmin} = this.props;

        return <NavBar isAdmin={isAdmin}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.authDir.userData.isAdmin,
    }
};

export default connect(mapStateToProps, null)(NavBarContainer);