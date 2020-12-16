import React from 'react'
import {connect} from "react-redux";
import NavBar from "./NavBar";
import {selectIsAdmin} from "../../redux/selectors/AuthSelector";

class NavBarContainer extends React.Component {
    render() {
        const {isAdmin} = this.props;

        return <NavBar isAdmin={isAdmin}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: selectIsAdmin(state),
    }
};

export default connect(mapStateToProps, null)(NavBarContainer);