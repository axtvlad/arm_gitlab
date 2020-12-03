import {connect} from "react-redux";
import {
    postFaq,
    updateFaqAnswerKz,
    updateFaqAnswerRu,
    updateFaqQuestionKz,
    updateFaqQuestionRu
} from "../../../../redux/Reducers/FaqReducer";
import AddFaq from "./AddFaq";
import {Redirect} from "react-router-dom";
import React from "react";
import {notification} from "antd";

class AddFaqContainer extends React.Component {
    componentDidMount() {
        const {isAdmin} = this.props;

        if (!isAdmin) {
            this.error()
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
        const {isAdmin, faqsDir} = this.props;

        if (isAdmin) {
            if (faqsDir.isPosted) {
                return <Redirect to={'/faqs'}/>
            } else {
                return (
                    <AddFaq {...this.props}/>
                )
            }
        }
    }
}

const MapStateToProps = (state) => {
    return {
        faqsDir: state.faqsDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postFaq,
        updateFaqQuestionRu,
        updateFaqQuestionKz,
        updateFaqAnswerRu,
        updateFaqAnswerKz,
    }
)(AddFaqContainer);