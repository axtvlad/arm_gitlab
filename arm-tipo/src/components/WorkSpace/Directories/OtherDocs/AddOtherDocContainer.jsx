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
        if (!this.props.isAdmin) {
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            if (this.props.otherDocsDir.isPosted) {
                return <Redirect to={'/otherDocs'}/>
            } else {
                return (
                    <AddOtherDoc {...this.props} />
                )
            }
        }
    }
}

let mapStateToProps = (state) => {
    return {
        otherDocsDir: state.otherDocsDir,
        isAdmin: state.authDir.isAdmin
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