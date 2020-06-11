import React from "react";
import SearchPage from "./SearchPage";
import {connect} from "react-redux";

class SearchPageContainer extends React.Component {
    render() {
        return (
            <SearchPage/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps, null)(SearchPageContainer);
