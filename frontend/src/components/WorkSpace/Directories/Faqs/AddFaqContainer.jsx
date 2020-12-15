import {connect} from "react-redux";
import {postFaq} from "../../../../redux/reducers/FaqReducer";
import AddFaq from "./AddFaq";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddFaqContainer extends React.Component {
    render() {
        const {postFaq} = this.props;

        return (
            <AddFaq postFaq={postFaq}/>
        )
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postFaq,
    })
)(AddFaqContainer);