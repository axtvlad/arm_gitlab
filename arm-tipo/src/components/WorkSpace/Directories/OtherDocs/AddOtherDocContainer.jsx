import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import AddOtherDoc from "./AddOtherDoc";
import {
    postOtherDoc,
    updateOtherDocFileKz,
    updateOtherDocFileRu,
    updateOtherDocNameKz,
    updateOtherDocNameRu
} from "../../../../redux/Reducers/OtherDocReducer";
import {notification, Spin} from "antd";

class AddOtherDocContainer extends React.Component {
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
        const {isAdmin, otherDocsDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (otherDocsDir.isPosted) {
                return <Redirect to={'/otherDocs'}/>
            } else {
                return (
                    <AddOtherDoc {...this.props} />
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        otherDocsDir: state.otherDocsDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        postOtherDoc,
        updateOtherDocNameRu,
        updateOtherDocNameKz,
        updateOtherDocFileRu,
        updateOtherDocFileKz,
    }
)(AddOtherDocContainer)