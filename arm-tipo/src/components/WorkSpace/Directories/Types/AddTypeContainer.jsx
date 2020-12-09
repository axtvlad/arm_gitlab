import {postType} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import AddType from "./AddType";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddTypeContainer extends React.Component {
    render() {
        const {postType} = this.props;

        return (
            <AddType postType={postType}/>
        )
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postType,
    })
)(AddTypeContainer);
