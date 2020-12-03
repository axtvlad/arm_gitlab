import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getFaqById} from "../../../../redux/Reducers/FaqReducer";
import DisplayFaq from "./DisplayFaq";
import {compose} from "redux";

class DisplayFaqContainer extends React.Component {
    componentDidMount() {
        const {match, getFaqById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getFaqById(id);
    }


    render() {
        return (
            <DisplayFaq {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faq: GetDirectory(DirectoriesTypes.FAQS),
        currentItem: state.faqsDir.currentFaq,
        isFetching: state.faqsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getFaqById
    }),
    withRouter
)(DisplayFaqContainer);