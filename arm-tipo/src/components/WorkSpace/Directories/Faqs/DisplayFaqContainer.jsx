import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getFaqById} from "../../../../redux/Reducers/FaqReducer";
import DisplayFaq from "./DisplayFaq";

class DisplayFaqContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getFaqById(id);
    }

    render() {
        if (!this.props.currentItem.length) {
            return <h1>TEST</h1>
        } else {
        return (
            <DisplayFaq {...this.props}/>
        )}
    }
}

let mapStateToProps = (state) => {
    return {
        faq: GetDirectory(DirectoriesTypes.FAQS),
        currentItem: state.faqsDir.currentFaq,
        isFetching: state.faqsDir.isFetching,
    }
};

let FaqContainerUrl = withRouter(DisplayFaqContainer);

export default connect(mapStateToProps,
    {
        getFaqById
    }
)(FaqContainerUrl);