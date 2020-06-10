import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getFaqById} from "../../../../redux/Reducers/FaqReducer";
import DisplayFaq from "./DisplayFaq";
import {notification} from "antd";
import {Spin} from "antd/es";

class DisplayFaqContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getFaqById(id);
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayFaq {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        faq: GetDirectory(DirectoriesTypes.FAQS),
        currentItem: state.faqsDir.currentFaq,
        isFetching: state.faqsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

let FaqContainerUrl = withRouter(DisplayFaqContainer);

export default connect(mapStateToProps,
    {
        getFaqById
    }
)(FaqContainerUrl);