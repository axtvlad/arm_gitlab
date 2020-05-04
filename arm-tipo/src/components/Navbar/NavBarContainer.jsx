import React from 'react'
import {connect} from "react-redux";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar/>
        )
    }
}

let mapStateToProps = () => {
    return null
};

export default connect(mapStateToProps,
    null
)(NavBarContainer);