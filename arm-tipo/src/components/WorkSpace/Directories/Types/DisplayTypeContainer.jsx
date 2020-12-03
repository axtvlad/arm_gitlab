import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {getTypeById} from "../../../../redux/Reducers/TypeReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayTypeContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getTypeById} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getTypeById(id);
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
        const {isAdmin} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.TYPES),
        currentItem: state.typesDir.currentType,
        isFetching: state.typesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};


export default compose(
    connect(mapStateToProps, {
        getTypeById
    }),
    withRouter
)(DisplayTypeContainer);