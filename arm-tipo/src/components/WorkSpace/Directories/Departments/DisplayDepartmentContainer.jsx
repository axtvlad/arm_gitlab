import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getDepartmentById} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayDepartmentContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getDepartmentById} = this.props;

        if (!isAdmin) {
            this.error()
        } else {

            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getDepartmentById(id);
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
        type: GetDirectory(DirectoriesTypes.DEPARTMENTS),
        currentItem: state.departmentsDir.currentDepartment,
        isFetching: state.departmentsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getDepartmentById
    }),
    withRouter
)(DisplayDepartmentContainer)